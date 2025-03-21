import React from 'react';
import {DashComponentProps} from '../props';

// Define TreeNode type
type TreeNode = {
  title: string;
  key: string;
  children?: TreeNode[];
  isLeaf?: boolean;
};

type TreeNodes = TreeNode[];

type Props = {
  /**
   * The ID of this component, used to identify dash components
   * in callbacks. The ID needs to be unique across all of the
   * components in an app.
   */
  id: string;
  
  /**
   * The hierarchical tree data converted from a NetworkX DAG.
   * Each node should have at minimum: 
   * - title: display text
   * - key: unique identifier
   * - children: array of child nodes (optional)
   * - isLeaf: boolean indicating if this is a leaf node (optional)
   */
  data: TreeNodes;
  
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
   * Dash-assigned callback that should be called to report property changes
   * to Dash, to make them available for callbacks.
   */
  setProps: (props: Record<string, any>) => void;
} & DashComponentProps;

// Define styles
const styles = {
  treeContainer: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    maxHeight: '500px',
    overflowY: 'auto'
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
  }
};

/**
 * DagFileTree visualizes a NetworkX Directed Acyclic Graph (DAG) as an interactive 
 * nested file tree with node selection capabilities.
 */
const DagFileTree = (props: Props) => {
  const { id, data, selectedKeys = [], expandedKeys = [], persistSelection = true, setProps } = props;
  
  // Handle node selection
  const handleSelect = (nodeKey: string) => {
    let newSelectedKeys;
    if (selectedKeys.includes(nodeKey)) {
      // Deselect if already selected
      newSelectedKeys = selectedKeys.filter(key => key !== nodeKey);
    } else {
      // Select if not already selected
      newSelectedKeys = [...selectedKeys, nodeKey];
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
            style={styles.checkbox}
          />
          <span 
            style={{
              ...styles.nodeTitle,
              ...(isSelected ? styles.selected : {})
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
  
  return (
    <div id={id} style={styles.treeContainer}>
      {data && data.length > 0 ? (
        data.map(node => renderTreeNode(node))
      ) : (
        <div>No data to display</div>
      )}
    </div>
  );
};

DagFileTree.defaultProps = {
  data: [],
  selectedKeys: [],
  expandedKeys: [],
  persistSelection: true
};

export default DagFileTree;
