window.onload = function() {

	/* side Bar */
        document.getElementById('sidebar-btn')
        .addEventListener("click", function() {
          document.getElementById('sidebar')
          .classList.toggle('visible');
        });


    /* Top Bar */
	    document.getElementById("menu")
	     .addEventListener("click",openMenu); 
	        
     };



function openMenu(){
	document.getElementById("dropdown").classList.toggle("active");
}