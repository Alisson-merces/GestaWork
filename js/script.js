/*Move a posição da imagem */
document.addEventListener("mousemove", (event) => {
    // Obter a posição do mouse na tela
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Pegar o elemento da imagem
    const image = document.getElementById("movable-image");

    // Definir a quantidade de movimento com base na posição do mouse
    const moveX = (mouseX / window.innerWidth) * 20 - 10; // Move a imagem 10px para esquerda/direita
    const moveY = (mouseY / window.innerHeight) * 20 - 10; // Move a imagem 10px para cima/baixo

    // Aplicar transformação CSS para mover a imagem
    image.style.transform = `translate(${moveX}px, ${moveY}px)`;
});


/* Cards vão aparecer com a rolagem da tela */

document.addEventListener("DOMContentLoaded", () => {
    const blocks = document.querySelectorAll(".col-md-4");

    function handleScroll() {
        blocks.forEach((block) => {
            const rect = block.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                block.classList.add("visible");
                block.classList.remove("hidden");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
});




/* carrossel */
document.addEventListener("DOMContentLoaded", function () {
    var myCarousel = document.querySelector('#carouselExample');
    var carousel = new bootstrap.Carousel(myCarousel, {
      interval: 3000,
      ride: 'carousel'
    });
  });





/*SERVIÇOS*/
/* Cards vão aparecer com a rolagem da tela */
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".serv-desc .card-hidden");

    function revealCards() {
        let delay = 0;

        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                setTimeout(() => {
                    card.classList.add("card-visible");
                    card.classList.remove("card-hidden");
                }, delay);

                delay += 200;
            }
        });
    }

    window.addEventListener("scroll", revealCards);
});



/*FAQ sobre Perguntas Respondidas Frequentemente */
  document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const currentAnswer = this.nextElementSibling;
            const currentIcon = this.querySelector('i');

            // Fecha todas as outras respostas
            faqQuestions.forEach(item => {
                const answer = item.nextElementSibling;
                const icon = item.querySelector('i');
                if (answer !== currentAnswer) {
                    answer.style.display = 'none';
                    icon.classList.remove('open');
                }
            });

            // Alterna a exibição da resposta e a seta da pergunta clicada
            if (currentAnswer.style.display === 'block') {
                currentAnswer.style.display = 'none';
                currentIcon.classList.remove('open');
            } else {
                currentAnswer.style.display = 'block';
                currentIcon.classList.add('open');
            }
        });
    });
});


/* BLOG / NOTÍCIAS */

const categorias = [
    "UX / UI", "SEO", "marketing digital", "desenvolvimento",
    "Analytics", "Website", "Migração", "Implantação",
    "E-commerce", "Cloud Computing", "DevOps", "Cibersegurança",
    "System Integration", "IoT"
];

let quantidadeNoticias = 15;
let paginaInicial = 0;
let paginaFinal = quantidadeNoticias;
let temaAtual = categorias[0]; // Começa com a primeira categoria

const noticias = {
    apiKey: "3ba8a4e08e154e1ab254c9f60e36a0a9",
    buscarNoticias: function (categoria) {
        fetch(
            `https://newsapi.org/v2/everything?q=${categoria}&language=pt&apiKey=${this.apiKey}`
        )
            .then((response) => response.json())
            .then((data) => this.exibirNoticias(data));
    },
    exibirNoticias: function (data) {
        if (paginaInicial === 0) {
            document.querySelector("#news-container").textContent = "";
        }

        for (let i = paginaInicial; i < Math.min(paginaFinal, data.articles.length); i++) {
            const { title, urlToImage, description, url } = data.articles[i];

            let card = document.createElement("div");
            card.className = "col-md-4"; // 3 colunas por linha
            card.innerHTML = `
                <div class="card shadow-sm position-relative">
                    <img src="${urlToImage || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description || "Descrição não disponível."}</p>
                    </div>
                </div>
            `;
            card.setAttribute("onclick", `location.href='${url}'`);
            document.querySelector("#news-container").appendChild(card);
        }

        if (paginaFinal < data.articles.length) {
            document.getElementById("loadMoreBtn").style.display = "block";
        } else {
            document.getElementById("loadMoreBtn").style.display = "none";
        }
    }
};

function buscar(categoria) {
    paginaInicial = 0;
    paginaFinal = quantidadeNoticias;
    temaAtual = categoria;
    noticias.buscarNoticias(categoria);
}

function carregarMais() {
    paginaInicial = paginaFinal;
    paginaFinal += 10;
    noticias.buscarNoticias(temaAtual);
}

// Inicializa com o primeiro tema
noticias.buscarNoticias(temaAtual);


/* Contato */

// Máscara de telefone
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function (event) {
    let input = phoneInput.value.replace(/\D/g, ''); // Remove tudo que não for número
    input = input.substring(0, 11); // Limita a 11 caracteres

    // Formata o número
    if (input.length > 10) {
        phoneInput.value = `(${input.substring(0, 2)}) ${input.substring(2, 7)}-${input.substring(7, 11)}`;
    } else if (input.length > 6) {
        phoneInput.value = `(${input.substring(0, 2)}) ${input.substring(2, 6)}-${input.substring(6, 10)}`;
    } else if (input.length > 2) {
        phoneInput.value = `(${input.substring(0, 2)}) ${input.substring(2, 6)}`;
    } else if (input.length > 0) {
        phoneInput.value = `(${input}`;
    }
});