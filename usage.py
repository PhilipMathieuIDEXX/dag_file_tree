import dash
from dash import html, dcc, callback, Output, Input, State
import dag_file_tree

# Create a hierarchical structure of dog breeds with overlaps to form a DAG
dog_breeds = [
    {
        "title": "Working Dogs",
        "key": "working",
        "children": [
            {
                "title": "Herding Dogs",
                "key": "herding",
                "children": [
                    {"title": "Border Collie", "key": "border_collie", "isLeaf": True},
                    {"title": "German Shepherd", "key": "german_shepherd", "isLeaf": True},
                    {"title": "Australian Shepherd", "key": "australian_shepherd", "isLeaf": True}
                ]
            },
            {
                "title": "Guardian Dogs",
                "key": "guardian",
                "children": [
                    {"title": "Rottweiler", "key": "rottweiler", "isLeaf": True},
                    {"title": "Doberman", "key": "doberman", "isLeaf": True},
                    {"title": "Bullmastiff", "key": "bullmastiff", "isLeaf": True}
                ]
            }
        ]
    },
    {
        "title": "Sporting Dogs",
        "key": "sporting",
        "children": [
            {
                "title": "Retrievers",
                "key": "retrievers",
                "children": [
                    {"title": "Golden Retriever", "key": "golden_retriever", "isLeaf": True},
                    {"title": "Labrador Retriever", "key": "labrador_retriever", "isLeaf": True},
                    {"title": "Chesapeake Bay Retriever", "key": "chesapeake_bay_retriever", "isLeaf": True}
                ]
            },
            {
                "title": "Spaniels",
                "key": "spaniels",
                "children": [
                    {"title": "Cocker Spaniel", "key": "cocker_spaniel", "isLeaf": True},
                    {"title": "English Springer Spaniel", "key": "english_springer_spaniel", "isLeaf": True},
                    {"title": "Cavalier King Charles Spaniel", "key": "cavalier_king_charles_spaniel", "isLeaf": True}
                ]
            }
        ]
    },
    {
        "title": "Toy Dogs",
        "key": "toy",
        "children": [
            {
                "title": "Companion Dogs",
                "key": "companion",
                "children": [
                    {"title": "Pomeranian", "key": "pomeranian", "isLeaf": True},
                    {"title": "Chihuahua", "key": "chihuahua", "isLeaf": True},
                    {"title": "Pug", "key": "pug", "isLeaf": True}
                ]
            }
        ]
    },
    {
        "title": "Multi-purpose Dogs",
        "key": "multi_purpose",
        "children": [
            {
                "title": "Service Dogs",
                "key": "service",
                "children": [
                    {"title": "Labrador Retriever", "key": "labrador_retriever", "isLeaf": True},  # Overlap with Retrievers
                    {"title": "German Shepherd", "key": "german_shepherd", "isLeaf": True},        # Overlap with Herding
                    {"title": "Golden Retriever", "key": "golden_retriever", "isLeaf": True}       # Overlap with Retrievers
                ]
            },
            {
                "title": "Therapy Dogs",
                "key": "therapy",
                "children": [
                    {"title": "Cavalier King Charles Spaniel", "key": "cavalier_king_charles_spaniel", "isLeaf": True},  # Overlap with Spaniels
                    {"title": "Pug", "key": "pug", "isLeaf": True},                                # Overlap with Companion Dogs
                    {"title": "Border Collie", "key": "border_collie", "isLeaf": True}             # Overlap with Herding
                ]
            }
        ]
    }
]

app = dash.Dash(__name__)

# Create a layout with DagFileTree on the left and selection panel on the right
app.layout = html.Div([
    html.H1("Dog Breed Explorer"),
    
    # Controls section
    html.Div([
        dcc.Checklist(
            id='select-parents-checkbox',
            options=[{'label': 'Auto-select parents / Cascade deselection to children', 'value': 'cascade'}],
            value=[],  # Use a list for value when using dcc.Checklist
        ),
    ], style={'marginBottom': '15px', 'padding': '10px', 'backgroundColor': '#f5f5f5', 'borderRadius': '4px'}),
    
    html.Div([
        # Left panel with the tree
        html.Div([
            dag_file_tree.DagFileTree(
                id='dog-breed-tree',
                data=dog_breeds,
                selectedKeys=[],
                expandedKeys=["working", "sporting", "toy"],  # Initially expand main categories
                selectParents=False  # Default value, will be controlled by checkbox
            )
        ], style={'width': '25%', 'float': 'left'}),
        
        # Right panel to display selected breeds
        html.Div([
            html.H2("Selected Dog Breeds"),
            html.Div(id='selected-breeds-display', 
                     style={'padding': '10px', 'border': '1px solid #ddd', 'borderRadius': '4px', 'minHeight': '200px'})
        ], style={'width': '70%', 'float': 'right', 'marginLeft': '5%'})
    ], style={'display': 'flex', 'margin': '20px 0px'})
], style={'fontFamily': 'Arial, sans-serif', 'padding': '20px'})

# Callback to update the right panel when nodes are selected
@callback(
    Output('selected-breeds-display', 'children'),
    Input('dog-breed-tree', 'selectedKeys')
)
def update_selected_breeds(selected_keys):
    if not selected_keys or len(selected_keys) == 0:
        return html.P("No breeds selected. Click on the checkboxes to select dog breeds.")
    
    # Helper function to find nodes by keys
    def find_nodes_by_keys(nodes, keys, found_nodes=None):
        if found_nodes is None:
            found_nodes = []
        
        for node in nodes:
            if node['key'] in keys:
                found_nodes.append(node)
            
            if 'children' in node and node['children']:
                find_nodes_by_keys(node['children'], keys, found_nodes)
        
        return found_nodes
    
    selected_nodes = find_nodes_by_keys(dog_breeds, selected_keys)
    
    return [
        html.Div([
            html.H3(node['title'], style={'marginBottom': '5px'}),
            html.P(f"ID: {node['key']}", style={'color': '#666', 'fontSize': '0.9em'})
        ], style={'marginBottom': '15px'})
        for node in selected_nodes
    ]

# Callback to toggle the selectParents property
@callback(
    Output('dog-breed-tree', 'selectParents'),
    Input('select-parents-checkbox', 'value'),
    # Preserve selection state when toggling the option
    State('dog-breed-tree', 'selectedKeys')
)
def toggle_select_parents(enable_select_parents, selected_keys):
    return 'cascade' in enable_select_parents

if __name__ == '__main__':
    app.run(debug=True)
