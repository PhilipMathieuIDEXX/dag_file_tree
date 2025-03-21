import React, { useState, useEffect } from 'react';
import { DashComponentProps } from '../props';

// TreeNode base interface to avoid recursive type references
type TreeNode = {
    title: string;
    key: string;
    isLeaf: boolean;
    enabled?: boolean; // New property to control disabled state
    children?: Array<any>; // Use any to avoid recursive type references
  }
  
// Component-specific props
type DagFileTreeSpecificProps = {
    /**
     * The hierarchical tree data converted from a NetworkX DAG.
     */
    data: TreeNode[];
  
  /**
   * Array of selected node keys.
   */
  selectedKeys: string[];
  
  /**
   * Array of expanded node keys.
   */
  expandedKeys: string[];
  
  /**
   * Whether to maintain selection state when expanding/collapsing nodes.
   */
  persistSelection: boolean;
  
  /**
   * Whether to automatically select parent nodes when a child is selected
   * and deselect child nodes when a parent is deselected.
   */
  selectParents: boolean;
  
  /**
   * Maximum height of the tree container in pixels.
   */
  maxHeight?: number;
  
  /**
   * Optional search query to filter nodes in the tree.
   */
  searchQuery?: string;
  
  /**
   * Number of milliseconds to debounce search input changes.
   */
  debounceMs?: number;
};

// Combine with DashComponentProps
type Props = DagFileTreeSpecificProps & DashComponentProps;

// Define styles
const styles = {
  treeContainer: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflowY: 'auto' as const
  },
  node: {
    margin: '2px 0',
  },
  nodeContent: {
    display: 'flex',
    alignItems: 'center',
    padding: '4px 0',
  },
  nodeChildren: {
    paddingLeft: '20px',
    borderLeft: '1px dashed #ccc',
    marginLeft: '7px'
  },
  expander: {
    cursor: 'pointer',
    marginRight: '5px',
    fontSize: '10px',
    width: '15px',
    height: '15px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    marginRight: '5px',
  },
  nodeTitle: {
    cursor: 'pointer',
  },
  selected: {
    fontWeight: 'bold',
    color: '#2196F3'
  },
  disabled: {
    color: '#999',
    opacity: 0.6
  },
  searchContainer: {
    marginBottom: '10px',
  },
  searchInput: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
};

// Recursive filter function
const filterNodes = (nodes: TreeNode[], query: string): TreeNode[] => {
  return nodes.reduce<TreeNode[]>((acc, node) => {
    const titleMatch = node.title.toLowerCase().includes(query.toLowerCase());
    
    // If this node matches, include it with all its original children
    if (titleMatch) {
      acc.push({
        ...node,
      });
      return acc;
    }
    
    // If this node doesn't match, check if any children match
    if (node.children) {
      const filteredChildren = filterNodes(node.children, query);
      if (filteredChildren.length > 0) {
        // Only include this node if it has matching children
        acc.push({
          ...node,
          children: filteredChildren,
        });
      }
    }
    
    return acc;
  }, []);
};

/**
 * DagFileTree visualizes a NetworkX Directed Acyclic Graph (DAG) as an interactive 
 * nested file tree with node selection capabilities.
 */
const DagFileTree = (props: Props) => {
  const {
    id,
    data,
    selectedKeys = [],
    expandedKeys = [],
    persistSelection = true,
    selectParents = false,
    maxHeight = 500,
    searchQuery = '',
    debounceMs = 300,
    setProps
  } = props;

  // Local state for search input
  const [query, setQuery] = useState(searchQuery);

  // Debounce search input updates
  useEffect(() => {
    const handler = setTimeout(() => {
      if (setProps) {
        setProps({ searchQuery: query });
      }
    }, debounceMs);
    return () => clearTimeout(handler);
  }, [query, debounceMs, setProps]);

  // Update local query when prop changes
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  // Build a map of child-to-parent relationships for quick parent lookup
  const buildParentMap = () => {
    const parentMap: Record<string, string[]> = {};
    
    const mapChildren = (nodes: TreeNode[], parentKey?: string) => {
      nodes.forEach(node => {
        if (parentKey) {
          if (!parentMap[node.key]) {
            parentMap[node.key] = [];
          }
          parentMap[node.key].push(parentKey);
        }
        if (node.children && node.children.length > 0) {
          mapChildren(node.children, node.key);
        }
      });
    };
    
    mapChildren(data);
    return parentMap;
  };
  
  // Get all parent keys for a given node
  const getParentKeys = (nodeKey: string, parentMap: Record<string, string[]>) => {
    const parentKeys: string[] = [];
    
    const traverseParents = (key: string) => {
      const parents = parentMap[key];
      if (!parents) return;
      
      for (const parentKey of parents) {
        if (!parentKeys.includes(parentKey)) {
          parentKeys.push(parentKey);
          traverseParents(parentKey);
        }
      }
    };
    
    traverseParents(nodeKey);
    return parentKeys;
  };
  
  // Get all child keys for a given node
  const getChildKeys = (nodeKey: string) => {
    const childKeys: string[] = [];
    
    const findNode = (nodes: TreeNode[]): TreeNode | null => {
      for (const node of nodes) {
        if (node.key === nodeKey) {
          return node;
        }
        if (node.children && node.children.length > 0) {
          const foundNode = findNode(node.children);
          if (foundNode) {
            return foundNode;
          }
        }
      }
      return null;
    };
    
    const collectChildKeys = (node: TreeNode) => {
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          childKeys.push(child.key);
          collectChildKeys(child);
        });
      }
    };
    
    const node = findNode(data);
    if (node && node.children) {
      collectChildKeys(node);
    }
    
    return childKeys;
  };

  // Handle node selection
  const handleSelect = (nodeKey: string) => {
    let newSelectedKeys;
    
    if (selectedKeys.includes(nodeKey)) {
      // Deselect if already selected
      newSelectedKeys = selectedKeys.filter(key => key !== nodeKey);
      
      // If selectParents is enabled, also deselect all children
      if (selectParents) {
        const childKeys = getChildKeys(nodeKey);
        newSelectedKeys = newSelectedKeys.filter(key => !childKeys.includes(key));
      }
    } else {
      // Select if not already selected
      newSelectedKeys = [...selectedKeys, nodeKey];
      
      // If selectParents is enabled, also select all parents
      if (selectParents) {
        const parentMap = buildParentMap();
        const parentKeys = getParentKeys(nodeKey, parentMap);
        
        // Add all parent keys without duplicates
        parentKeys.forEach(key => {
          if (!newSelectedKeys.includes(key)) {
            newSelectedKeys.push(key);
          }
        });
      }
    }
    
    // Update props to trigger callbacks
    setProps({ selectedKeys: newSelectedKeys });
  };
  
  // Handle node expansion
  const handleExpand = (nodeKey: string) => {
    let newExpandedKeys;
    if (expandedKeys.includes(nodeKey)) {
      // Collapse if already expanded
      newExpandedKeys = expandedKeys.filter(key => key !== nodeKey);
    } else {
      // Expand if not already expanded
      newExpandedKeys = [...expandedKeys, nodeKey];
    }
    
    // Update props to trigger callbacks
    setProps({ expandedKeys: newExpandedKeys });
  };
  
  // Recursive function to render tree nodes
  const renderTreeNode = (node: TreeNode) => {
    const isExpanded = expandedKeys.includes(node.key);
    const isSelected = selectedKeys.includes(node.key);
    const hasChildren = node.children && node.children.length > 0;
    const isDisabled = node.enabled === false;
    
    return (
      <div key={node.key} style={styles.node}>
        <div style={styles.nodeContent}>
          {hasChildren ? (
            <span 
              style={styles.expander}
              onClick={() => handleExpand(node.key)}
            >
              {isExpanded ? '▼' : '►'}
            </span>
          ) : (
            <span style={{ ...styles.expander, visibility: 'hidden' }}>
              ►
            </span>
          )}
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={() => handleSelect(node.key)}
            style={{
              ...styles.checkbox,
              ...(isDisabled ? styles.disabled : {})
            }}
          />
          <span 
            style={{
              ...styles.nodeTitle,
              ...(isSelected ? styles.selected : {}),
              ...(isDisabled ? styles.disabled : {})
            }}
            onClick={() => handleSelect(node.key)}
          >
            {node.title}
          </span>
        </div>
        
        {(hasChildren && isExpanded) && (
          <div style={styles.nodeChildren}>
            {node.children.map(child => renderTreeNode(child))}
          </div>
        )}
      </div>
    );
  };

  // Apply search filter if query exists
  const filteredData = query.trim() === ''
    ? data
    : filterNodes(data, query.trim().toLowerCase());

  return (
    <div>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      <div id={id} style={{...styles.treeContainer, maxHeight: `${maxHeight}px`}}>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map(node => renderTreeNode(node))
        ) : (
          <div>No data to display</div>
        )}
      </div>
    </div>
  );
};

// Define defaultProps separately
DagFileTree.defaultProps = {
  data: [],
  selectedKeys: [],
  expandedKeys: [],
  persistSelection: true,
  selectParents: false,
  maxHeight: 500,
  searchQuery: '',
  debounceMs: 300
};

export default DagFileTree;