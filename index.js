const books = [
	{
		id: "1",
		title: `Apple. Эволюция компьютера`,
		author: `Владимир Невзоров`,
		img: `https://bukva.ua/img/products/449/449532_200.jpg`,
		plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
	},
	{
		id: "2",
		title: `Как объяснить ребенку информатику`,
		author: `Кэрол Вордерман`,
		img: `https://bukva.ua/img/products/480/480030_200.jpg`,
		plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
	},
	{
		id: "3",
		title: `Путь скрам-мастера. #ScrumMasterWay`,
		author: `Зузана Шохова`,
		img: `https://bukva.ua/img/products/480/480090_200.jpg`,
		plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
	},
];

localStorage.setItem('books', JSON.stringify(books))

const root = document.querySelector("#root");
console.log(root);
const left_div = document.createElement('div');
const right_div = document.createElement('div');

root.appendChild(left_div);
root.appendChild(right_div);

root.firstElementChild.className = 'left_div';
root.lastElementChild.className = 'right_div';

const heading = document.createElement('h1');
heading.textContent = 'Books';
heading.style.paddingLeft = "40px"

const utils = document.createElement('ul');
utils.className = "list_books"
left_div.appendChild(utils)
const listBooks = document.querySelector('.list_books')

const leftDiv = document.querySelector('.left_div')
leftDiv.append(heading, utils)
const rightDiv = document.querySelector('.right_div')

const addBook = document.createElement('button')
addBook.textContent = 'Add'
addBook.className = "button_add"
left_div.appendChild(addBook);

const buttonAdd = document.querySelector('.button_add')
buttonAdd.addEventListener('click', renderAdd)



 function renderList() {
	const booksFromLS = JSON.parse(localStorage.getItem("books"))
	const listMarkUp =  booksFromLS.map(({title, id}) => {
		 return `<li id = ${id} class = 'books_items'>
		 <p class = 'title_text'>${title}</p>
		 <button class = 'button_delete'>Delete</button>
		 <button class = 'button_edit'>Edit</button>
		 </li>`
	 }).join('')
listBooks.insertAdjacentHTML('beforeend', listMarkUp)
const titleText = document.querySelectorAll('.title_text')
titleText.forEach(item => item.addEventListener('click', renderPreview))
const buttonDelete = document.querySelectorAll('.button_delete')
buttonDelete.forEach(item => item.addEventListener('click', renderDelete))
const buttonEdit = document.querySelectorAll('.button_edit')
buttonEdit.forEach(item => item.addEventListener('click', renderEdit))
}
 renderList();

function renderDelete(e){
	const booksFromLS = JSON.parse(localStorage.getItem("books"))
	const currentElement = e.target.parentNode
	const getAttr = currentElement.getAttribute('id')
	console.log(getAttr)
	const findBook = booksFromLS.filter( el => el.id !== getAttr)
    console.log(findBook);
	const newBooks = localStorage.setItem("books", JSON.stringify(findBook))
    listBooks.innerHTML = ""
	rightDiv.innerHTML = ""
	renderList()
}

function renderEdit(e){
	const booksFromLS = JSON.parse(localStorage.getItem("books"))
	const currentElement = e.target.parentNode
	const getAttrById = currentElement.getAttribute('id')
    console.log(getAttrById)
	const findBookById = booksFromLS.find( el => el.id !== getAttrById)
	console.log('findBookById');
}
function renderAdd(){
	const newBook = {
		id: `${Date.now()}`,
		title: '',
		author: "",
		img: "",
		plot: "",
	}
	rightDiv.innerHTML = ''
	rightDiv.insertAdjacentHTML('beforeend', getMarkupForm(newBook))
	formFunc(newBook)
	
	const saveBtn = document.querySelector('.save__btn')
    saveBtn.addEventListener('click', clickSaveBtn)
    
	function clickSaveBtn(e){
		e.preventDefault()
        console.log(newBook);
		const newBookLS = JSON.parse(localStorage.getItem('books'))
        console.log(newBookLS)
		newBookLS.push(newBook)

		localStorage.setItem('books', JSON.stringify(newBookLS))
		listBooks.innerHTML = ''
		renderList()

		rightDiv.innerHTML = ''	 
		rightDiv.insertAdjacentHTML('beforeend', renderPreviewMarkUp(newBook))

		setTimeout(() => {
			alert(`Book added successfully`)
		}, 300)
	}   
	
}

function getMarkupForm(book){
return `<form action=""> 
<label for="">Title<input type="text" name="title" value=""></label>
<label for="">Author<input type="text" name="author" value=""></label>
<label for="">Img<input type="text" name="img" value=""></label>
<label for="">Plot<input type="text" name="plot" value=""></label>
<button class = "save__btn" type="submit">Save</button>
</form>`
}

function formFunc(book){
   const inputs = document.querySelectorAll('input')
   console.log(inputs);
   inputs.forEach(input => input.addEventListener('change', updateValue))
   function updateValue(e){
     console.log(e.target.name);
	 console.log(e.target.value);
	  book[e.target.name] = e.target.value
   }
   console.log(book);
}
function renderPreview(event){
	const result = books.find(elem => elem.title === event.target.innerText)
	rightDiv.innerHTML = ''	 
	rightDiv.insertAdjacentHTML('beforeend', renderPreviewMarkUp(result))

}
 function renderPreviewMarkUp({title, author, img, plot}){
	return `
	<div>
        <h2>${title}</h2>
        <p>${author}</p>
        <img src=${img} alt=${title}>
		<p>${plot}</p>
    </div>` 
 }

 