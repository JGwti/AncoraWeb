document.addEventListener('DOMContentLoaded', async function () {

    const jUrl = "JSON/Eventos.json";
    const jDataEventos = await fetch(jUrl);
    const datos = await jDataEventos.json();

    // Verifica si datos es un objeto con propiedades "cometas" y "familia"
    if (datos && datos.Eventos) {
        const sliderContainer = document.querySelector('.slider');

        // Itera sobre las propiedades del objeto "Eventos"
        for (const eventoKey in datos.Eventos) {
            if (datos.Eventos.hasOwnProperty(eventoKey)) {
                const evento = datos.Eventos[eventoKey];

                // Crea los elementos HTML para cada slide
                const slide = document.createElement('div');
                slide.classList.add('slide');

                const backgroundContainer = document.createElement('div');
                backgroundContainer.classList.add('background-container');

                const backContImage = document.createElement('div');
                backContImage.classList.add('background-container-img');


                const img = document.createElement('img');
                img.src = evento.imagen;
                img.alt = "Imagen de fondo";

                const contentContainer = document.createElement('div');
                contentContainer.classList.add('content-container');

                const card = document.createElement('div');
                card.classList.add('card');

                const cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                cardTitle.textContent = evento.nombre;

                const cardText = document.createElement('p');
                cardText.classList.add('card-text');
                cardText.textContent = evento.descripcion;

                const btn = document.createElement('a');
                btn.href = "#";
                btn.classList.add('btn', 'btn-primary');
                btn.textContent = "Enlace a:";

                card.appendChild(cardTitle);
                card.appendChild(cardText);
                card.appendChild(btn);

                contentContainer.appendChild(card);
                backgroundContainer.appendChild(backContImage);
                backContImage.appendChild(img);
                backgroundContainer.appendChild(contentContainer);
                slide.appendChild(backgroundContainer);
                sliderContainer.appendChild(slide);
            }
        }
    } else {
        console.error("Los datos no son válidos o no contienen la estructura esperada.");
    }

    let currentIndex = 0;

    function showNextSlide() {
        const slides = document.querySelectorAll('.slide');
        currentIndex = (currentIndex + 1) % slides.length;
        const offset = -currentIndex * 100;
        slides.forEach(slide => {
            slide.style.transform = `translateX(${offset}%)`;
        });
    }

    setInterval(showNextSlide, 6000);
});
