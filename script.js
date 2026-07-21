const produtos = [
    {
        id: 1,
        nome: "Calça Preta Chave (G10 a G30)",
        desc: "O clássico indispensável do baile. Conforto total e caimento perfeito variando do G10 ao G30.",
        preco: "R$ 150,00",
        img: "https://i.postimg.cc/8PSpBbgC/Captura-de-tela-2026-07-21-165205.png" // Cole o link direto do Postimage aqui
    },
    {
        id: 2,
        nome: "Calça Vermelha G30 (G10 a G30)",
        desc: "Modelo exclusivo em destaque com tamanhos ampliados até o G30, puro estilo underground.",
        preco: "R$ 150,00",
        img: "https://i.postimg.cc/pr8dVGby/Captura-de-tela-2026-07-21-165029.png" // Cole o link direto do Postimage aqui
    },
    {
        id: 3,
        nome: "Calça Florida Chave (G10 a G30)",
        desc: "Estampa exclusiva florida de quebrada, caimento solto e conforto máximo pro rolê.",
        preco: "R$ 150,00",
        img: "https://i.postimg.cc/Xvm3Zfgq/Captura-de-tela-2026-07-21-165300.png" // Cole o link direto do Postimage aqui
    }
];

const coresDisponiveis = [
    { nome: "Preta", codigo: "#1a1a1a", border: "#444" },
    { nome: "Azul", codigo: "#1e3a8a", border: "#3b82f6" },
    { nome: "Cinza", codigo: "#4b5563", border: "#9ca3af" },
    { nome: "Vermelha", codigo: "#991b1b", border: "#ef4444" },
    { nome: "Branca", codigo: "#f3f4f6", border: "#d1d5db", textDark: true }
];

let produtoSelecionado = null;
let corSelecionada = "Preta";

// Renderiza os produtos na tela
function renderizarProdutos() {
    const grid = document.getElementById('grid-produtos');
    grid.innerHTML = produtos.map(p => `
        <div class="bg-cardBg border border-gray-800 rounded-2xl overflow-hidden hover:border-reggaeYellow/50 transition-all group flex flex-col justify-between">
            <div>
                <div class="relative overflow-hidden aspect-square bg-darkBg">
                    <img src="${p.img}" alt="${p.nome}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://placehold.co/600x600/141414/ffffff?text=Sagat+Pants'">
                    <span class="absolute top-3 left-3 bg-darkBg/80 backdrop-blur-md text-reggaeYellow text-xs font-bold px-3 py-1 rounded-full border border-gray-800">
                        ${p.preco}
                    </span>
                </div>
                <div class="p-6">
                    <h4 class="text-lg font-black uppercase text-white mb-2 group-hover:text-reggaeYellow transition-colors">${p.nome}</h4>
                    <p class="text-gray-400 text-sm mb-4 line-clamp-2">${p.desc}</p>
                </div>
            </div>
            <div class="p-6 pt-0">
                <button onclick="abrirModal(${p.id})" class="w-full bg-darkBg border border-gray-700 text-white font-extrabold py-3 rounded-xl uppercase tracking-wider text-xs hover:bg-reggaeYellow hover:text-black hover:border-reggaeYellow transition-all">
                    Selecionar Modelo
                </button>
            </div>
        </div>
    `).join('');
}

// Abre o modal de customização
function abrirModal(id) {
    produtoSelecionado = produtos.find(p => p.id === id);
    document.getElementById('modal-titulo-produto').innerText = produtoSelecionado.nome;
    
    // Renderiza opções de cores
    const containerCores = document.getElementById('opcoes-cores');
    containerCores.innerHTML = coresDisponiveis.map((c, index) => `
        <label class="cursor-pointer flex flex-col items-center justify-center p-3 rounded-xl border border-gray-800 bg-darkBg hover:border-reggaeYellow transition-all option-cor" data-cor="${c.nome}">
            <span class="w-6 h-6 rounded-full mb-1 border shadow" style="background-color: ${c.codigo}; border-color: ${c.border}"></span>
            <span class="text-xs font-semibold ${c.textDark ? 'text-black' : 'text-gray-300'}">${c.nome}</span>
            <input type="radio" name="cor" value="${c.nome}" ${index === 0 ? 'checked' : ''} class="sr-only" onchange="selecionarCor('${c.nome}')">
        </label>
    `).join('');

    corSelecionada = coresDisponiveis[0].nome;
    document.getElementById('select-tamanho').value = "";
    document.getElementById('modal-custom').classList.remove('hidden');
}

function selecionarCor(nomeCor) {
    corSelecionada = nomeCor;
}

function fecharModal() {
    document.getElementById('modal-custom').classList.add('hidden');
}

// Envia mensagem customizada para o WhatsApp oficial
function enviarWhatsApp(e) {
    e.preventDefault();
    const tamanho = document.getElementById('select-tamanho').value;
    if (!tamanho || !produtoSelecionado) return;

    const mensagem = `Salve, dei uma olhadinha no site e queria saber como funciona pra pegar uma calça '${produtoSelecionado.nome}', tamanho ${tamanho}, cor ${corSelecionada}`;
    const numeroWhatsApp = "5511922048764";
    
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    fecharModal();
}

// Inicializa o site
window.onload = function() {
    renderizarProdutos();
}