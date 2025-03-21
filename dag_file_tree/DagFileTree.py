# AUTO GENERATED FILE - DO NOT EDIT

import typing  # noqa: F401
import numbers # noqa: F401
from typing_extensions import TypedDict, NotRequired, Literal # noqa: F401
from dash.development.base_component import Component, _explicitize_args
try:
    from dash.development.base_component import ComponentType # noqa: F401
except ImportError:
    ComponentType = typing.TypeVar("ComponentType", bound=Component)


class DagFileTree(Component):
    """A DagFileTree component.
DagFileTree visualizes a NetworkX Directed Acyclic Graph (DAG) as an interactive 
nested file tree with node selection capabilities.

Keyword arguments:

- id (string; optional):
    Unique ID to identify this component in Dash callbacks.

- data (list of dicts; optional):
    The hierarchical tree data converted from a NetworkX DAG.

    `data` is a list of dicts with keys:

    - title (string; required)

    - key (string; required)

    - isLeaf (boolean; required)

    - enabled (boolean; optional)

    - children (list of boolean | number | string | dict | lists; optional)

- debounceMs (number; default 300):
    Number of milliseconds to debounce search input changes.

- expandedKeys (list of strings; optional):
    Array of expanded node keys.

- maxHeight (number; default 500):
    Maximum height of the tree container in pixels.

- persistSelection (boolean; default True):
    Whether to maintain selection state when expanding/collapsing
    nodes.

- searchQuery (string; default ''):
    Optional search query to filter nodes in the tree.

- selectParents (boolean; default False):
    Whether to automatically select parent nodes when a child is
    selected and deselect child nodes when a parent is deselected.

- selectedKeys (list of strings; optional):
    Array of selected node keys."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dag_file_tree'
    _type = 'DagFileTree'
    Data = TypedDict(
        "Data",
            {
            "title": str,
            "key": str,
            "isLeaf": bool,
            "enabled": NotRequired[bool],
            "children": NotRequired[typing.Sequence[typing.Any]]
        }
    )

    @_explicitize_args
    def __init__(
        self,
        data: typing.Optional[typing.Sequence["Data"]] = None,
        selectedKeys: typing.Optional[typing.Sequence[str]] = None,
        expandedKeys: typing.Optional[typing.Sequence[str]] = None,
        persistSelection: typing.Optional[bool] = None,
        selectParents: typing.Optional[bool] = None,
        maxHeight: typing.Optional[typing.Union[int, float, numbers.Number]] = None,
        searchQuery: typing.Optional[str] = None,
        debounceMs: typing.Optional[typing.Union[int, float, numbers.Number]] = None,
        id: typing.Optional[typing.Union[str, dict]] = None,
        **kwargs
    ):
        self._prop_names = ['id', 'data', 'debounceMs', 'expandedKeys', 'maxHeight', 'persistSelection', 'searchQuery', 'selectParents', 'selectedKeys']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'data', 'debounceMs', 'expandedKeys', 'maxHeight', 'persistSelection', 'searchQuery', 'selectParents', 'selectedKeys']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(DagFileTree, self).__init__(**args)
