let today = new Date();
let formatDate = today.toDateString();
let selectElement = document.getElementById('date');
selectElement.innerHTML = formatDate;


function itemManager() {
    let formInput = [];
    let selectedItems = [];
    let finishTasks = [];
    let done = document.getElementById("done");

        function getItem() {
            //regex for white spaces and empty string
            let regex = /^\s*$/;
            if( !regex.test(document.getElementById("fitem").value) ){
                formInput.push(document.getElementById("fitem").value);
                //to clear the imput element
                document.getElementById("fitem").value = '';
            }
        }

        function selectItem(id, cb) {
            if(cb.checked) {
                selectedItems.push(parseInt(id));
            }
            if(!cb.checked) {
                for(let i = 0; i < selectedItems.length; i++){
                    if(selectedItems[i] === id){
                        selectedItems.splice(i, 1);
                    }
                }
            }
            return selectedItems;
        }

        function deleteItem() {
            let setItems = new Set(selectedItems);
            finishTasks.push(formInput.filter((e, i) => setItems.has(i)));
            formInput = formInput.filter((e, i) => !setItems.has(i));
            selectedItems = [];
            return finishTasks;
        }

        function returnList() {
            //display the items entered to the list
            let formOutput = document.getElementById("listItems");
            if(formInput.length > 1) {
                formOutput.innerHTML =  formInput.map(
                    (e, i) => {
                       return  "<input  id='" +  i + "' type='checkbox' onclick='todo.selectItem("+ i +", this)'/>" + "<label for='"+ i +"'>" + e + "</label>";
                    }
                ).join("<br/>");
            } 
            else if (formInput.length === 1) {
                formOutput.innerHTML =  "<input  id='" + 0  + "' type='checkbox' onclick='todo.selectItem(0, this)' />" + "<label for='" + 0 + "'>" + formInput + "</label>";
            } else { formOutput.innerHTML = "" }


            //finished tasks
            if(finishTasks.length) {
                    done.innerHTML = finishTasks.flat().map(e => "<div>" + e + "</div>").join("");
                
            } else {done.innerHTML = ""}
        } 

        function clearList(){
            done.innerHTML = "";
            finishTasks = [];
        }

        return {
            getItem: getItem,
            deleteItem: deleteItem,
            selectItem: selectItem,
            returnList: returnList,
            clearList: clearList
        };
    }

const todo = itemManager();

    
