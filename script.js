// массив данных: 3 объекта с фото и текстом, которые меняются при переключении слайдера
let sliderItems = [ 
    { url: "images/rostov_on_don_admiral.jpg",
      city: "Rostov-on-Don<br>LCD admiral",
      apartmentArea: "81 m2",
      repairTime: "3.5 months",
      repairCost: "Upon request"
    },
    { url: "images/sochi_thieves.jpg",
      city: "Sochi<br>Thieves",
      apartmentArea: "105 m2",
      repairTime: "4 months",
      repairCost: "Upon request"
    },
    { url: "images/rostov_on_don_patriotic.jpg",
      city: "Rostov-on-Don<br>Patriotic",
      apartmentArea: "93 m2",
      repairTime: "3 months",
      repairCost: "Upon request"
    }    
];

let projectsImage = document.querySelector(".projectsImage"); // div с фотографиями
let slider = document.querySelector(".slider"); // div с кнопками слайдера
let sliderDots = document.querySelector(".slider_dots"); // div с точками
let sliderText = document.querySelector(".projects_repair"); // div с текстом слайдера
let sliderLinks = document.querySelector(".projects_navigation"); // ul с ссылками

// функция, отвечающая за представление слайдера
function initSlider() { 
    if (!sliderItems || !sliderItems.length) return;    

    initImages();
    initArrows();
    initDots();
    initText();
    initLinks();   
};

// функция создает div с фоном (фото из массива), назначает ему классы и добавляет его в разметку
function initImages() { 
    sliderItems.forEach((sliderItem, index) => {
        let imageDiv = `<div class="sliderImage n${index} ${index === 0 ? "activeImage" : ""}" 
                        style="background-image: url(${sliderItems[index].url});" data-index="${index}"></div>`; 
        projectsImage.innerHTML += imageDiv;
    })
};

// функция отвечает за стрелки в слайдере: назначает им обработчики нажатия в зависимости от класса (левая - класс arrow_left, правая - класс arrow_right)
function initArrows() { 
    slider.querySelectorAll(".arrow").forEach(arrow => {
        arrow.addEventListener("click", () => {
            let activeNumber = +projectsImage.querySelector(".activeImage").dataset.index; // получить номер текущего слайда
            let nextNumber; // номер следующего слайда

            if (arrow.classList.contains("arrow_left")) { // для левой стрелки: если текущий слайд - первый, - следующий будет последним в массиве, иначе - предыдущим в массиве
                nextNumber = activeNumber === 0 ? sliderItems.length - 1 : activeNumber - 1; 
            } else { // для правой стрелки: если текущий слайд - последний, - следующий будет первым в массиве, иначе - следующим в массиве
                nextNumber = activeNumber === sliderItems.length - 1 ? 0 : activeNumber + 1;
            };

            moveSlider(nextNumber);
        })
    })       
};

// функция создает точки в слайдере (класс dot) по количеству фото в массиве, назначает им классы и добавляет в разметку
function initDots() { 
    sliderItems.forEach((sliderItem, index) => {
        let dot = `<button class="slider_button dot dot${index} ${index === 0 ? "activeDot" : ""}" data-index="${index}">                        
                   </button>`;
        sliderDots.innerHTML += dot;                                                                                

        sliderDots.querySelectorAll(".dot").forEach(dot => {
            dot.addEventListener("click", function() {
                moveSlider(this.dataset.index);                    
            })
        })
    })                
};

// функция назначает текст для первого слайда всем соответствующим блокам при загрузке страницы 
function initText() {          
        sliderText.querySelector(".cityText").innerHTML = sliderItems[0].city;
        sliderText.querySelector(".areaText").innerHTML = sliderItems[0].apartmentArea;
        sliderText.querySelector(".timeText").innerHTML = sliderItems[0].repairTime
        sliderText.querySelector(".costText").innerHTML = sliderItems[0].repairCost;       
};

// функция отвечает за ссылки над слайдером: при загрузке назначает класс activeLink первой ссылке, затем назначает им обработчики нажатия, переключающие слайдер
function initLinks() { 
    let links = sliderLinks.querySelectorAll(".projects_navigation_link");
    links[0].classList.add("activeLink");

    links.forEach((link, index) => {
        link.addEventListener("click", function() {
            moveSlider(index);
        });            
    })
};

// функция отвечает за переключение слайда, отображение активной точки, актывной ссылки, а также текста из массива, соответствующего слайду       
function moveSlider(number) { 
        projectsImage.querySelector(".activeImage").classList.remove("activeImage"); // убрать класс activeImage у предыдущего слайда и назначить текущему
        projectsImage.querySelector(".n" + number).classList.add("activeImage");  

        sliderDots.querySelector(".activeDot").classList.remove("activeDot"); // убрать класс activeDot у предыдущей точки и назначить следующей
        sliderDots.querySelector(".dot" + number).classList.add("activeDot");

        sliderText.querySelector(".cityText").innerHTML = sliderItems[number].city; // изменить текст во всех соответствующих блоках при переключении слайда
        sliderText.querySelector(".areaText").innerHTML = sliderItems[number].apartmentArea;
        sliderText.querySelector(".timeText").innerHTML = sliderItems[number].repairTime
        sliderText.querySelector(".costText").innerHTML = sliderItems[number].repairCost;  

        sliderLinks.querySelector(".activeLink").classList.remove("activeLink"); // убрать класс activeLink у предыдущей ссылки и назначить следующей
        sliderLinks.querySelectorAll(".projects_navigation_link")[number].classList.add("activeLink");
};

document.addEventListener("DOMContentLoaded", initSlider);