const enabler = document.getElementById("flexSwitchCheckDefault")
const dropdown = document.querySelector(".channel-selector")
enabler.addEventListener("click", (event) => {
    if(enabler.checked) {
        dropdown.visibility = "visible"
    }else{
        dropdown.visibility = "hidden"
    }
})