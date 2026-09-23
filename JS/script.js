document.addEventListener('DOMContentLoaded', function () {
    // O Java script foi usado com ia, mas a ideia de como funcionar foi realizada e comandada pelo grupo.
    // O java funciona pelo menos essa primeira parte ele le uma parte do codigo e com base nisso ele descobrira a lingua em que é para ser colocada ai então eu traduzi todos os nomes de cada esporte e com base nisos ele colocara a lista se ele ler que for ingles a lista sera dos esportes o nome em que esta passando embaixo do carrosel sera ingles eu fiz isso pq por não ter muito conhecimentoa ainda com o java script, ja tive esse problema e ter que ter traduzido tudo a mão em outras partes do site e como nesse carrosel a escrita fica dentro do codigo do carrosel eu resolvi fazer dessa forma dando as instruções de como eu queria que fosse e a ideia que eu tinha, então com ajuda da ia chegamos nesse modelo de tradução.
    const items = [
        { src: "Imagens/tecnologia_do_gol.jpg", key: "futebol" },
        { src: "Imagens/corrida_tecnologia.jpg", key: "atletismo" },
        { src: "Imagens/basquete_tecnologia.jpg", key: "basquete" },
        { src: "Imagens/iamgem_tecnologia_do_voleibol.jpg", key: "voleibol" },
        { src: "Imagens/imagem_xadres.webp", key: "xadrez" }
    ];

    const traducoes = {
        pt: {
            futebol: "Futebol",
            atletismo: "Atletismo",
            basquete: "Basquete",
            voleibol: "Voleibol",
            xadrez: "Xadrez"
        },
        en: {
            futebol: "Soccer",
            atletismo: "Athletics",
            basquete: "Basketball",
            voleibol: "Volleyball",
            xadrez: "Chess"
        },
        es: {
            futebol: "Fútbol",
            atletismo: "Atletismo",
            basquete: "Baloncesto",
            voleibol: "Voleibol",
            xadrez: "Ajedrez"
        }
    };

    // Já aqui aqui seria mais o codigo do carregamento das imagens, e as setas seria mais a ideia e o modelo com base no que eu entendi, aqui seria o funcionamento das setas que dependendo de qual das setas ser escolhida pelo usuario ele passa uma imagem para frente e esconde a outra no total acho que duas ficam escondidas, mas de função do java script para o funcionamento do site e basicamente a movimentação do carrosel. 

    function detectarIdioma(){
        const caminho = window.location.pathname.toLowerCase();
        if (caminho.includes("ingles")) return "en";
        if (caminho.includes("espanhol")) return "es";
        return "pt";
    }

    const idioma = detectarIdioma();
    const t = traducoes[idioma] || traducoes.pt;

    const total = items.length;

    const imgLeft = document.getElementById('imgLeft');
    const imgCenter = document.getElementById('imgCenter');
    const imgRight = document.getElementById('imgRight');
    const labelLeft = document.getElementById('labelLeft');
    const labelCenter = document.getElementById('labelCenter');
    const labelRight = document.getElementById('labelRight');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsWrap = document.getElementById('dots');

    // Só roda o código do carrossel se os elementos dele existirem nesta página
    if (dotsWrap && imgLeft && imgCenter && imgRight && prevBtn && nextBtn) {

        let index = 0;

        items.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(dot);
        });
        const dots = Array.from(dotsWrap.children);

        function setImages(){
            const leftIdx = (index - 1 + total) % total;
            const rightIdx = (index + 1) % total;

            imgLeft.src = items[leftIdx].src;
            labelLeft.textContent = t[items[leftIdx].key];

            imgCenter.src = items[index].src;
            labelCenter.textContent = t[items[index].key];

            imgRight.src = items[rightIdx].src;
            labelRight.textContent = t[items[rightIdx].key];

            dots.forEach((d, i) => d.classList.toggle('active', i === index));
        }

        function update(){
            const all = [imgLeft, imgCenter, imgRight, labelLeft, labelCenter, labelRight];
            all.forEach(el => el.classList.add('fade'));
            setTimeout(() => {
                setImages();
                all.forEach(el => el.classList.remove('fade'));
            }, 220);
        }

        function goTo(i){
            index = (i + total) % total;
            update();
        }

        prevBtn.addEventListener('click', () => goTo(index - 1));
        nextBtn.addEventListener('click', () => goTo(index + 1));

        setImages();
    }


    // Efeito 3D interativo em todas as imagens com a classe card-image
    const cards = document.querySelectorAll('.card-image');
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = "transform 0.5s ease";
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = "transform 0.1s ease-out";
        });
    });

});