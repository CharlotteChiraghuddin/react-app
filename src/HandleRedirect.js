
       function HandleRedirect(){
            if(window.location.search.length > 0){
                const stringQuery = window.location.search;
                const urlParams = new URLSearchParams(stringQuery);
                const newCode = urlParams.get("code");
                if(newCode){
                    localStorage.setItem("code",newCode);
                }
            }
        }
        export default HandleRedirect;