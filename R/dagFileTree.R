# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dagFileTree <- function(id=NULL, data=NULL, debounceMs=NULL, expandedKeys=NULL, maxHeight=NULL, persistSelection=NULL, searchQuery=NULL, selectParents=NULL, selectedKeys=NULL) {
    
    props <- list(id=id, data=data, debounceMs=debounceMs, expandedKeys=expandedKeys, maxHeight=maxHeight, persistSelection=persistSelection, searchQuery=searchQuery, selectParents=selectParents, selectedKeys=selectedKeys)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DagFileTree',
        namespace = 'dag_file_tree',
        propNames = c('id', 'data', 'debounceMs', 'expandedKeys', 'maxHeight', 'persistSelection', 'searchQuery', 'selectParents', 'selectedKeys'),
        package = 'dagFileTree'
        )

    structure(component, class = c('dash_component', 'list'))
}
