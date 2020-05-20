const inputValue = document.querySelector('input[name="price"]')

inputValue.addEventListener("keydown", function (event) {

    setTimeout(function() {
        let { value } = event.target
        
        value = value.replace(/\D/g, "")

        value = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
    
        event.target.value = value 

    }, 1)

})