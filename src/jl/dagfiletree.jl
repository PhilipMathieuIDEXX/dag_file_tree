# AUTO GENERATED FILE - DO NOT EDIT

export dagfiletree

"""
    dagfiletree(;kwargs...)

A DagFileTree component.
DagFileTree visualizes a NetworkX Directed Acyclic Graph (DAG) as an interactive 
nested file tree with node selection capabilities.
Keyword arguments:
- `id` (String; optional): Unique ID to identify this component in Dash callbacks.
- `data` (optional): The hierarchical tree data converted from a NetworkX DAG.. data has the following type: Array of lists containing elements 'title', 'key', 'isLeaf', 'enabled', 'children'.
Those elements have the following types:
  - `title` (String; required)
  - `key` (String; required)
  - `isLeaf` (Bool; required)
  - `enabled` (Bool; optional)
  - `children` (Array of Bool | Real | String | Dict | Arrays; optional)s
- `debounceMs` (Real; optional): Number of milliseconds to debounce search input changes.
- `expandedKeys` (Array of Strings; optional): Array of expanded node keys.
- `maxHeight` (Real; optional): Maximum height of the tree container in pixels.
- `persistSelection` (Bool; optional): Whether to maintain selection state when expanding/collapsing nodes.
- `searchQuery` (String; optional): Optional search query to filter nodes in the tree.
- `selectParents` (Bool; optional): Whether to automatically select parent nodes when a child is selected
and deselect child nodes when a parent is deselected.
- `selectedKeys` (Array of Strings; optional): Array of selected node keys.
"""
function dagfiletree(; kwargs...)
        available_props = Symbol[:id, :data, :debounceMs, :expandedKeys, :maxHeight, :persistSelection, :searchQuery, :selectParents, :selectedKeys]
        wild_props = Symbol[]
        return Component("dagfiletree", "DagFileTree", "dag_file_tree", available_props, wild_props; kwargs...)
end

