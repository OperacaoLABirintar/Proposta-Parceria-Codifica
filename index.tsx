// This file uses vanilla JavaScript to manipulate the DOM,
// mimicking a component-based structure without a framework.
// The .tsx extension is used as per user request for file structure consistency.

const App = () => {
    const root = document.getElementById('root');
    if (!root) return;

    // --- 1. Define constants and styles ---
    const COLORS = {
        background: '#f4f0e8', // Areia
        text: '#3a3a3a',
        goiaba: '#ff595a',
        laranja: '#ffa400',
        white: '#ffffff',
    };

    const STYLES = `
        @import url('https://fonts.googleapis.com/css2?family=Aglet+Slab:wght@400;700&family=Raleway:wght@400;500;700&display=swap');

        :root {
            --goiaba: ${COLORS.goiaba};
            --laranja: ${COLORS.laranja};
            --background: ${COLORS.background};
            --text: ${COLORS.text};
            --white: ${COLORS.white};
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html, body {
            font-family: 'Raleway', sans-serif;
            background-color: var(--background);
            color: var(--text);
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        #root {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem 1rem;
        }

        .container {
            width: 100%;
            max-width: 800px;
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .logo-svg {
            width: 80px;
            height: auto;
            margin-bottom: 0.5rem;
        }

        .logo-text {
             font-family: 'Aglet Slab', serif;
             font-size: 2.5rem;
             font-weight: 700;
             letter-spacing: -1px;
        }
        
        .logo-text .lab { color: var(--goiaba); }
        .logo-text .irintar { color: var(--laranja); }

        h1 {
            font-family: 'Aglet Slab', serif;
            font-size: 2.2rem;
            margin-top: 1rem;
            color: var(--goiaba);
            font-weight: 400;
        }
        
        h2 {
            font-family: 'Aglet Slab', serif;
            font-size: 1.8rem;
            color: var(--goiaba);
            border-bottom: 2px solid var(--laranja);
            padding-bottom: 0.5rem;
            margin-bottom: 1.5rem;
            font-weight: 700;
        }

        h3 {
            font-family: 'Aglet Slab', serif;
            font-size: 1.4rem;
            color: var(--text);
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            font-weight: 700;
        }
        
        p, li {
            font-size: 1rem;
            margin-bottom: 1rem;
        }

        ul {
            list-style-position: inside;
            padding-left: 0.5rem;
        }
        
        strong {
             font-weight: 700;
        }

        .card {
            background-color: var(--white);
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .model-example {
            border-left: 4px solid var(--laranja);
            padding: 1rem 1.5rem;
            margin: 1.5rem 0;
            background-color: #fffaf0;
            border-radius: 0 8px 8px 0;
        }
        
        .responsibilities-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }

        @media (max-width: 768px) {
            h1 { font-size: 1.8rem; }
            h2 { font-size: 1.5rem; }
            .card { padding: 1.5rem; }
            .responsibilities-container {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
        }
    `;

    const injectStyles = () => {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = STYLES;
        document.head.appendChild(styleTag);
    };
    
    // --- 2. Helper function for creating elements ---
    // Fix: Add types for the function parameters to resolve TypeScript errors.
    const createElement = (tag: string, options: { className?: string; textContent?: string; innerHTML?: string; children?: (HTMLElement | null | undefined)[] } = {}) => {
        const el = document.createElement(tag);
        if (options.className) el.className = options.className;
        if (options.textContent) el.textContent = options.textContent;
        if (options.innerHTML) el.innerHTML = options.innerHTML;
        if (options.children) {
            options.children.forEach(child => child && el.appendChild(child));
        }
        return el;
    };
    
    // --- 3. Component-like functions to build UI sections ---
    
    const createLogo = () => {
        const logoSVG = `
            <svg class="logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g stroke="${COLORS.laranja}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M50,50 m0,-42 a42,42 0 1,1 0,84 a42,42 0 1,1 0,-84"/>
                    <path d="M50,50 m0,-28 a28,28 0 1,1 0,56 a28,28 0 1,1 0,-56"/>
                    <path d="M50,50 m0,-14 a14,14 0 1,1 0,28 a14,14 0 1,1 0,-28"/>
                    <path d="M50 8 L50 22"/>
                    <path d="M50 92 L50 78"/>
                    <path d="M8 50 L22 50"/>
                    <path d="M92 50 L78 50"/>
                </g>
            </svg>
        `;
        const logoText = `<span class="logo-text"><span class="lab">LAB</span><span class="irintar">IRINTAR</span></span>`;

        return createElement('div', {
            className: 'logo',
            innerHTML: logoSVG + logoText,
        });
    };

    const createHeader = () => {
        return createElement('header', {
            children: [
                createLogo(),
                createElement('h1', { textContent: 'Proposta de Parceria: LABirintar & Codifica' }),
            ]
        });
    };

    const createSection = (title, children) => {
        return createElement('section', {
            className: 'card',
            children: [
                createElement('h2', { textContent: title }),
                ...children,
            ]
        });
    };

    const createQuemSomosSection = () => {
        return createSection('Quem Somos', [
            createElement('p', { innerHTML: '<strong>LABirintar</strong> conecta escolas particulares com educadores especialistas para atividades extracurriculares. Operamos em 5 estados brasileiros com índice de satisfação de 95% e avaliação média de 4.8 estrelas.' }),
            createElement('p', { innerHTML: 'Nossa plataforma <strong>Nina</strong> gerencia todo ciclo operacional: desde prospecção comercial até execução de aulas, passando por recrutamento de educadores, gestão financeira e suporte contínuo.' }),
            createElement('p', { innerHTML: '<strong>Codifica</strong> construiu metodologia robusta em programação e robótica educacional. Vocês dominam pedagogia e conteúdo. Nós dominamos distribuição e operação em escala.' })
        ]);
    };
    
    const createModeloSection = () => {
        return createSection('O Modelo', [
            createElement('p', { textContent: 'Codifica recebe 10% do valor total pago pelas famílias em cada turma que usa sua metodologia.' }),
            createElement('div', {
                className: 'model-example',
                children: [
                    createElement('h3', { textContent: 'Exemplo de turma padrão:' }),
                    createElement('ul', {
                        children: [
                            createElement('li', { textContent: '15 alunos com mensalidade de ~R$ 400' }),
                            createElement('li', { textContent: 'R$ 6.000 de receita total mensal' }),
                            createElement('li', { innerHTML: '<strong>Codifica recebe R$ 600 mensais recorrentes</strong>' }),
                        ]
                    }),
                    createElement('p', { innerHTML: '<strong>20 turmas ativas = R$ 12.000 mensais recorrentes para Codifica</strong>' })
                ]
            }),
            createElement('p', { textContent: 'Pagamento processado automaticamente pela plataforma Nina. Você recebe sem precisar emitir nota, cobrar escola ou perseguir inadimplência.' })
        ]);
    };

    const createPropostaValorSection = () => {
        return createSection('Proposta de Valor', [
            createElement('h3', { textContent: 'Qualidade sem diluição' }),
            createElement('p', { textContent: 'Sua metodologia chega às escolas através de educadores que passam por curadoria rigorosa da LABirintar. Avaliamos perfil técnico, experiência pedagógica e fit cultural antes de qualquer contratação.' }),
            createElement('p', { textContent: 'Durante execução, monitoramos qualidade através de feedback contínuo de escolas e famílias. Se o educador não entrega o padrão esperado, substituímos. Sua marca permanece protegida porque controlamos quem representa Codifica nas salas de aula.' }),
            
            createElement('h3', { textContent: 'Praticidade total' }),
            createElement('p', { textContent: 'Você fornece metodologia, materiais e suporte técnico sobre o conteúdo. Nós fazemos literalmente todo o resto.' }),
            createElement('p', { textContent: 'A LABirintar prospecta escolas, negocia condições, fecha contratos, recruta educadores, gerencia agenda, comunicação, cobrança e suporte. A plataforma Nina centraliza tudo.' }),
            createElement('p', { textContent: 'Se uma família atrasa o pagamento, o problema é nosso. Se a escola pede alteração de horário, o problema é nosso. Codifica acorda, olha o dashboard e recebe a transferência no fim do mês. Simples assim.' }),

            createElement('h3', { textContent: 'Economia de estrutura' }),
            createElement('p', { textContent: '10% recorrente sem nenhum custo fixo do seu lado. Pense no que precisaria montar para escalar sozinho: equipe comercial, coordenação pedagógica, backoffice, suporte. Com a LABirintar, você cresce sem adicionar headcount.' }),
            createElement('p', { innerHTML: '<strong>Receita passiva real.</strong> Você produz uma vez, licencia múltiplas vezes e recebe recorrentemente enquanto as turmas seguem ativas.' }),
        ]);
    };

    const createResponsabilidadesSection = () => {
        const codificaList = createElement('ul', {
            children: [
                createElement('li', { textContent: 'Metodologia pedagógica completa' }),
                createElement('li', { textContent: 'Materiais didáticos e guias' }),
                createElement('li', { textContent: 'Suporte técnico sobre conteúdo' }),
                createElement('li', { textContent: 'Atualizações periódicas de material' }),
            ]
        });
        
        const labirintarList = createElement('ul', {
            children: [
                createElement('li', { textContent: 'Prospecção e fechamento comercial' }),
                createElement('li', { textContent: 'Recrutamento e gestão de educadores' }),
                createElement('li', { textContent: 'Execução operacional completa' }),
                createElement('li', { textContent: 'Gestão financeira e pagamentos' }),
                createElement('li', { textContent: 'Suporte contínuo para todos' }),
                createElement('li', { textContent: 'Plataforma tecnológica' }),
            ]
        });

        const container = createElement('div', {
            className: 'responsibilities-container',
            children: [
                createElement('div', {
                    children: [
                        createElement('h3', { textContent: 'Codifica entrega:' }),
                        codificaList
                    ]
                }),
                createElement('div', {
                    children: [
                        createElement('h3', { textContent: 'LABirintar entrega:' }),
                        labirintarList
                    ]
                })
            ]
        });

        return createSection('Responsabilidades', [container]);
    };
    
    const createPorQueFuncionaSection = () => {
         return createSection('Por Que Funciona', [
            createElement('p', { textContent: 'Já operamos com Teatro (Paca Tatu) e Culinária (Mão na Massa) nesse mesmo modelo. Provedores de conteúdo ganham distribuição em escala. Escolas ganham acesso a metodologias validadas. Famílias ganham qualidade com praticidade.' }),
            createElement('p', { textContent: 'Programação e robótica têm demanda crescente. Escolas sabem que precisam oferecer, mas não têm expertise interna. Codifica resolve o problema pedagógico. LABirintar resolve o problema operacional.' })
        ]);
    };

    // --- 4. Render the application ---
    const render = () => {
        root.innerHTML = ''; // Clear the root element
        
        const container = createElement('div', {
            className: 'container',
            children: [
                createHeader(),
                createQuemSomosSection(),
                createModeloSection(),
                createPropostaValorSection(),
                createResponsabilidadesSection(),
                createPorQueFuncionaSection(),
            ]
        });
        
        root.appendChild(container);
    };

    injectStyles();
    render();
};

// --- Execute the App ---
document.addEventListener('DOMContentLoaded', App);