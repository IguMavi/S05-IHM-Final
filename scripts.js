window.onload = () => {
  document.body.classList.add("dark");
}

function changeColor(color) {
  document.body.classList.toggle("dark", color === "dark");
}
/* MENU LATERAL */
function openMenu() {
  document.getElementById("menu_aba").classList.add("show");
}

function closeMenu() {
  document.getElementById("menu_aba").classList.remove("show");
}

document.addEventListener('click', function (event) {
  const menu = document.getElementById('menu_aba');
  const menuButton = document.getElementById('menu');

  if (!menu.contains(event.target) && !menuButton.contains(event.target) && menu.classList.contains('show')) {
    closeMenu();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && document.getElementById('menu_aba').classList.contains('show')) {
    closeMenu();
  }
});

/* TEMAS */
function temaInatel() {
  const root = document.documentElement;
  root.style.setProperty("--background-color", "#ebebeb");
  root.style.setProperty("--secondary-background", "#FFFFFF");
  root.style.setProperty("--dialog-background", "white");
  root.style.setProperty("--primary-color", "#0075D5");
  root.style.setProperty("--primary-color-hover", "#005bb5");
  root.style.setProperty("--text-color", "#000000");
  root.style.setProperty("--border-color", "#494949");
  closeMenu();
}

function temaDark() {
  const root = document.documentElement;
  root.style.setProperty("--background-color", "#121212");
  root.style.setProperty("--secondary-background", "#1E1E1E");
  root.style.setProperty("--dialog-background", "#333333");
  root.style.setProperty("--primary-color", "#0032D6");
  root.style.setProperty("--primary-color-hover", "#001bb5");
  root.style.setProperty("--text-color", "#FFFFFF");
  root.style.setProperty("--border-color", "#CCCCCC");
  closeMenu();
}


/* CARROSSEL */
const eventos = [
  { id: 1, title: "Semana do Software 2025", date: "12/05", time: "10:00", location: "Salão de Eventos", type: "tech", description: "Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400" },
  { id: 2, title: "Workshop de IoT", date: "12/01", time: "08:00", location: "Laboratório CS&I", type: "tech", description: "Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400" },
  { id: 3, title: "Festa dos Alunos 2025", date: "18/05", time: "19:00", location: "Área Esportiva", type: "cultural", description: "Venha comemorar a melhor Festa dos Alunos de todos os tempos!", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400" },
  { id: 4, title: "Feira de Oportunidades", date: "04/05", time: "10:00", location: "Salão de Eventos", type: "academic", description: "Venha conhecer empresas e projetos com destaque na área da engenharia.", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400" }
];

const carousel = document.querySelector(".carousel");

function createCards() {
  eventos.forEach(event => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <div class="info">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <p><span class="material-symbols-outlined icon" style="font-size:16px;vertical-align:middle;">event</span> ${event.date} às ${event.time}</p>
        <p><span class="material-symbols-outlined icon" style="font-size:16px;vertical-align:middle;">location_on</span> ${event.location}</p>
      </div>`;
    carousel.appendChild(card);
  });
}

let index = 0;

function nextCard() {
  index = (index + 1) % eventos.length;
  updateCarousel();
}

function prevCard() {
  index = (index - 1 + eventos.length) % eventos.length;
  updateCarousel();
}

function updateCarousel() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

document.getElementById("nextBtn").addEventListener("click", nextCard);
document.getElementById("prevBtn").addEventListener("click", prevCard);

// Auto-rotate carousel
setInterval(nextCard, 5000);

// Touch support
let startX;
carousel.addEventListener("touchstart", e => startX = e.touches[0].clientX);
carousel.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextCard();
  if (endX - startX > 50) prevCard();
});

createCards();

/* AULAS COMPONENTE */
class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.aulas = [
      { id: 1, disciplina: "S05 - Interface Homem-máquina", data: "ter", horario: "10:00", local: "P1-S17", prova_alert: false, prova: "12/05", frequencia: "10/25", nota: "10" },
      { id: 2, disciplina: "E01 - Circuitos Elétricos em Corrente Contínua", data: "ter", horario: "10:00", local: "P1-S17", prova_alert: true, prova: "12/05", frequencia: "10/25", nota: "5" },
      { id: 3, disciplina: "M02 - Álgebra e Geometria Analítica", data: "qua", horario: "10:00", local: "P1-S17", prova_alert: true, prova: "12/05", frequencia: "10/25", nota: "7" }
    ];
    this.hoje = "ter";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const aulasDia = this.aulas.filter(a => a.data === this.hoje);
    const styles = `
      <style>
        :host { --cor-click: #126ae2; --cor-sombra: #0a599b; --cor-text: #1f2937; --cor-white: #ffffff; }
        :host(:root) { font-family: 'Inter', sans-serif; }
        .comp-aula { background: var(--cor-white); padding: 20px; margin: 0 0 16px 0; border-radius: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; transition: all 0.3s; }
        .comp-aula:hover { box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-color: var(--cor-click); }
        .titulo_aula { font-weight: 600; font-size: 16px; color: var(--cor-text); margin-bottom: 8px; }
        p { font-size: 14px; color: #6b7280; margin: 8px 0; }
        .lable-prova { display: inline-block; padding: 8px 12px; background: var(--cor-click); color: var(--cor-white); border-radius: 6px; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
        .lables { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 12px; }
        .lable-frequencia, .lable-nota { padding: 8px 12px; border-radius: 6px; color: var(--cor-white); font-size: 12px; font-weight: 600; }
        .lable-frequencia { background: var(--cor-sombra); }
        .lable-nota { background: #10b981; }
      </style>
    `;

    const html = aulasDia.map(a => {
      let nota = Number(a.nota);
      let notaColor = nota < 6 ? "#ef4444" : nota < 8 ? "#f59e0b" : "#10b981";
      return `
        <div class="comp-aula">
          ${a.prova_alert ? `<div class="lable-prova">PROVA: <b>${a.prova}</b></div>` : ''}
          <div class="titulo_aula">${a.disciplina}</div>
          <p>Local e Horário: <b>${a.local} - ${a.horario}</b></p>
          <div class="lables">
            <div class="lable-frequencia">FALTAS: <b>${a.frequencia}</b></div>
            <div class="lable-nota" style="background: ${notaColor};">CR: <b>${nota}</b></div>
          </div>
        </div>`;
    }).join('');

    this.shadowRoot.innerHTML = styles + html;
  }
}

customElements.define("aulas-component", AulasComponent);

/* AUXÍLIOS */
const auxilios = [
  { nome: "Bolsa Mérito", valorMensal: 450, status: "Ativo", proximaDataPagamento: "10/12/2025", descricao: "Auxílio concedido com base no desempenho acadêmico." },
  { nome: "Auxílio Alimentação", valorMensal: 250, status: "Pendente", proximaDataPagamento: "Aguardando atualização", descricao: "Auxílio para custeio de refeições no campus." }
];
window.onload = () => {
  document.getElementById("tela_auxilios").style.display = "none";
  document.getElementById("tela_principal").style.display = "block";
}

function abrirAuxilios() {
  document.getElementById("tela_principal").style.display = "none";
  document.getElementById("tela_auxilios").style.display = "block";
  carregarAuxilios();
}

function voltarHome() {
  document.getElementById("tela_auxilios").style.display = "none";
  document.getElementById("tela_principal").style.display = "block";
}

function carregarAuxilios() {
  const lista = document.getElementById("lista_auxilios");
  lista.innerHTML = "";
  auxilios.forEach(a => {
    const card = document.createElement("div");
    card.className = "card_auxilio";
    card.innerHTML = `<h3>${a.nome}</h3>
      <p><b>Valor Mensal:</b> R$ ${a.valorMensal}</p>
      <p><b>Status:</b> ${a.status}</p>
      <p><b>Próx. Pagamento:</b> ${a.proximaDataPagamento}</p>
      <p>${a.descricao}</p>`;
    lista.appendChild(card);
  });
}

function toggleProfile() {
  console.log("Perfil clicado");
}