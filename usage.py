import dag_file_tree
import dash

app = dash.Dash(__name__)

app.layout = dag_file_tree.DagFileTree(id='component')


if __name__ == '__main__':
    app.run_server(debug=True)
