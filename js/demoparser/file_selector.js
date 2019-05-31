var fileInput = document.querySelector('input[type="file"]');
document.getElementById('get-file').onclick = function read() { 
    var file = fileInput.files.item(0); 
    var reader = new FileReader(); 
    reader.onload = function() { 
        // pass 'reader.result' to DemoFile
        console.log("Success");
        window.alert(reader.result);
     } 
    reader.readAsArrayBuffer(file); 
}