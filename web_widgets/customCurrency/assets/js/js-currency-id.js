$("input:text[id={{ctrl.name}}]").attr('id',function(index,id){
    $(this).prev()[0].htmlFor += index;
    return id += index;
});