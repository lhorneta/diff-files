'use strict';

angular.module('ang04').factory('diffService',  function ($q) {

  function getJsonFromAjax(element) {

	 var 
	    pathDir = element.getAttribute("data-file"),
	    deferred = $q.defer(),
	    inputName = element.getAttribute("name"),
	    form = $('input[name='+inputName+']').parents('form'),
	    file = null, file2 = null,
	    formData = new FormData($(form)[0]);
   
    $.ajax({
      type:"POST",
      url:'http://localhost:4000/'+pathDir,
      processData: false,
      contentType: false,
      data: formData,
      success:function(response){

        element.className += " success";
	    deferred.resolve(response);
     
      },
      error:function(data){
        element.className += " error";
        deferred.reject('Data not saved');
      } 
    });


    return deferred.promise;
  }

  return {
	 getJsonFromAjax: getJsonFromAjax
	};
});