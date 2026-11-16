/* Configuração (backend) e modelo de dados das seções */
"use strict";
// Estado e lógica principal da aplicação

/* URL do backend (Google Apps Script / webhook). Fica vazia no repositório:
   informe a sua em Configurações ou preencha aqui. NUNCA publique URLs com token/assinatura. */
const DEFAULT_URL = "";
const BACKEND_URL_KEY = 'ti-backend-url';
const PENDING_QUEUE_KEY = 'ti-pending-queue';


/* DATA MODEL */
const DEFAULT_SECTIONS = [
  { id: "geral",   title: "Geral",     items: [ "Gerente presente?", "Resp. TI presente", "PDVs padrão abertos", "Quantidade pdv", "PDVs self checkout abertos", "PDVs self checkout fila"] },   
  { id: "visao",   title: "Visão",     items: ["Loja segue padrão TI", "Equipamentos fora da área", "Não há acúmulo de sucata"] },
  { id: "PDVs",    title: "PDVs",      items: ["Quantidade de PDVs", "Scanner de Mão", "Scanner torre", "Monitor", "Teclado", "Leitor Biométrico", "Pinpad", "CPU", "Cancela"] },  
  { id: "comput",  title: "PCs",       items: ["Qtde de Notebooks na loja está controlada", "Notebooks no CPD", "Notebooks indevidos", "Desktop identificadas no CPD quando sem uso", "Equipamentos mapeados"] },
  { id: "impr",    title: "Impressoras", items: ["Quantidade condiz com o contrato?", "Impressoras existentes conferem?", "Impressoras PDV ativas funcionando", "Impressoras PDV armazenadas no CPD condferem", "Fora de uso ou sem controle?"] },
  { id: "cftv",    title: "CFTV",      items: ["Câmeras funcionando?", "Imagem adequada?", "Gravação ativa?", "Cobertura PDV?", "Cobertura estacionamento?", "Cobertura recebimento?", "Cobertura áreas criticas/gôndolas", "Qualidade adequadada?"] },
  { id: "audio",   title: "Áudio",     items: ["Caixas funcionando?", "Volume adequado?", "Sem ruídos ou interferências?", "Cobertura uniforme?"] },
  { id: "ant",     title: "Antenas",   items: ["Portal entrada ok?", "Portal saída ok?", "Teste RFID realizado?", "Portais ligados?"] },
  { id: "colet",   title: "Coletores", items: ["Quantidade correta", "Coletores no CPD", "Armazenamento adequado", "Equipamentos com bandoleira", "Estado físico"] },
  { id: "balanc",  title: "Balanças",  items: ["Balanças funcionando", "Sem avarias", "Quantidade correta", "Quantidade em reserva/CPD", "Integração funcionando", "Sinais de mau uso?"] },
  { id: "cell",    title: "Celulares", items: ["Quantidade controlada", "Todos ativos", "MDM aplicado", "Em uso operacional"] },
  { id: "scan",    title: "Scanners",  items: ["Quantidade correta", "Cabos bons", "Funcionando"] },
  { id: "self",    title: "Self CK",   items: ["Quantidade correta", "Funcionando", "Pesagem OK", "Ventilação adequada"] }, 
  { id: "cpd",     title: "CPD",       items: ["Impresora de Mesa", "Impressora PDV", "Scanner de Mão", "Scanner torre", "Balança de Mesa", "Desktop PDV", "Monitores Organizados", "Desktop Windows", "Gaveta", "Pinpad", "Telefone IP", "Coletor", "Celular", "Notebook", "Teclado", "Teclado PDV", "Headset", "Mouse", "Monitor", "Câmera",] },
  { id: "rede",    title: "Rede",      items: ["WiFi funcionando", "Rack organizado", "Cabeamento organizado", "Rede estável"] },
  { id: "proc",    title: "Processos", items: ["Abertura correta de chamados?", "Sem fluxo indevido", "Equipamentos quebrados não ficam retidos?"] },
  { id: "seg",     title: "Segurança", items: ["Equipamentos protegidos", "Sem risco furto", "Acesso CPD controlado"] }
];

/* SEÇÕES DO CHECKLIST — edite DEFAULT_SECTIONS acima para mudar o modelo. */
let SECTIONS = JSON.parse(JSON.stringify(DEFAULT_SECTIONS));
