/***
 * This is the main JSript file.All events defined her are subject to modification.
 */

// ----------TABS----------- 
function openContent(evt,contentName){
    var i ,tabcontent,tablinks;
    //Get all elements with class "tabcontent " and hide them
     tabcontent = document.getElementsByClassName("tabcontent");
     for(i = 0;i < tabcontent.length; i++){
       tabcontent[i].style.display = "none";
     }
     //GET all elements with class "tablinks " and remove the class "active"
     tablinks = document.getElementsByClassName("tablinks");
     for(i = 0;i < tablinks.length; i++){
       tablinks[i].className = tablinks[i].className.replace(" active", "");
     }
     //Show the current tab, and add an "active" class to the link the opened the tab
     document.getElementById(contentName).style.display = "grid";
     evt.currentTarget.className += " active";
 }