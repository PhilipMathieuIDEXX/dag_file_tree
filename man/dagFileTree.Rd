% Auto-generated: do not edit by hand
\name{dagFileTree}

\alias{dagFileTree}

\title{DagFileTree component}

\description{
DagFileTree visualizes a NetworkX Directed Acyclic Graph (DAG) as an interactive  nested file tree with node selection capabilities.
}

\usage{
dagFileTree(id=NULL, data=NULL, debounceMs=NULL, expandedKeys=NULL,
maxHeight=NULL, persistSelection=NULL, searchQuery=NULL,
selectParents=NULL, selectedKeys=NULL)
}

\arguments{
\item{id}{Character. Unique ID to identify this component in Dash callbacks.}

\item{data}{List of lists containing elements 'title', 'key', 'isleaf', 'enabled', 'children'.
those elements have the following types:
  - title (character; required)
  - key (character; required)
  - isleaf (logical; required)
  - enabled (logical; optional)
  - children (list of logical | numeric | character | named list | unnamed lists; optional)s. The hierarchical tree data converted from a NetworkX DAG.}

\item{debounceMs}{Numeric. Number of milliseconds to debounce search input changes.}

\item{expandedKeys}{List of characters. Array of expanded node keys.}

\item{maxHeight}{Numeric. Maximum height of the tree container in pixels.}

\item{persistSelection}{Logical. Whether to maintain selection state when expanding/collapsing nodes.}

\item{searchQuery}{Character. Optional search query to filter nodes in the tree.}

\item{selectParents}{Logical. Whether to automatically select parent nodes when a child is selected
and deselect child nodes when a parent is deselected.}

\item{selectedKeys}{List of characters. Array of selected node keys.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

