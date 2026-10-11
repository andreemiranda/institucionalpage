export interface SecretariaItem {
  id: string;
  sigla: string;
  nome: string;
  titular?: string;
  cargo?: string;
  tipo: 'secretaria' | 'agencia' | 'orgao';
  telefone: string;
  email: string;
  endereco: string;
  horario: string;
  siteUrl?: string;
  descricao: string;
}

export const SECRETARIAS_LIST: SecretariaItem[] = [
  {
    id: 'sms',
    sigla: 'SMS',
    nome: 'Secretaria Municipal de Saúde',
    titular: 'Wilson Pollara',
    cargo: 'Secretário Municipal de Saúde',
    tipo: 'secretaria',
    telefone: '(62) 3524-1500 / 3524-1510',
    email: 'gabinete.sms@goiania.go.gov.br',
    endereco: 'Av. Universitária, nº 645 - Setor Leste Universitário, Goiânia - GO',
    horario: 'Segunda a Sexta: 08h às 18h',
    siteUrl: 'https://www.goiania.go.gov.br/secretaria/secretaria-municipal-de-saude/',
    descricao: 'Responsável pela gestão e execução do Sistema Único de Saúde (SUS) no município de Goiânia, garantindo assistência médica, hospitalar e vigilância em saúde.'
  },
  {
    id: 'sefin',
    sigla: 'SEFIN',
    nome: 'Secretaria Municipal da Fazenda',
    titular: 'Célio Campos',
    cargo: 'Secretário Municipal da Fazenda',
    tipo: 'secretaria',
    telefone: '(62) 3524-3300',
    email: 'gabinete.sefin@goiania.go.gov.br',
    endereco: 'Paço Municipal - Bloco C, Av. do Cerrado, 999 - Park Lozandes',
    horario: 'Segunda a Sexta: 08h às 18h',
    siteUrl: 'https://www.goiania.go.gov.br/secretaria/secretaria-municipal-da-fazenda/',
    descricao: 'Gestão tributária, arrecadação de IPTU, ITU, ISSQN, execução fiscal e equilíbrio orçamentário do município de Goiânia.'
  },
  {
    id: 'sme',
    sigla: 'SME',
    nome: 'Secretaria Municipal de Educação',
    titular: 'Danilo de Azevedo Costa',
    cargo: 'Secretário Municipal de Educação',
    tipo: 'secretaria',
    telefone: '(62) 3524-8900',
    email: 'sme@goiania.go.gov.br',
    endereco: 'Rua 227-A, nº 331 - Setor Leste Universitário, Goiânia - GO',
    horario: 'Segunda a Sexta: 08h às 18h',
    siteUrl: 'https://www.goiania.go.gov.br/secretaria/secretaria-municipal-de-educacao/',
    descricao: 'Planejamento e coordenação do ensino infantil e fundamental na rede municipal de ensino, CMEIs e programas pedagógicos.'
  },
  {
    id: 'semad',
    sigla: 'SEMAD',
    nome: 'Secretaria Municipal de Administração',
    titular: 'Paulo Silva',
    cargo: 'Secretário Municipal de Administração',
    tipo: 'secretaria',
    telefone: '(62) 3524-4000',
    email: 'semad@goiania.go.gov.br',
    endereco: 'Paço Municipal - Bloco B, Park Lozandes, Goiânia - GO',
    horario: 'Segunda a Sexta: 08h às 18h',
    siteUrl: 'https://www.goiania.go.gov.br/secretaria/secretaria-municipal-de-administracao/',
    descricao: 'Gestão de recursos humanos, patrimônio público, compras governamentais e concursos públicos da Prefeitura.'
  },
  {
    id: 'seinfra',
    sigla: 'SEINFRA',
    nome: 'Secretaria Municipal de Infraestrutura Urbana',
    titular: 'Denes Pereira',
    cargo: 'Secretário Municipal de Infraestrutura',
    tipo: 'secretaria',
    telefone: '(62) 3524-8300',
    email: 'seinfra@goiania.go.gov.br',
    endereco: 'Av. Atílio Corrêa Lima, nº 1222 - Cidade Jardim, Goiânia - GO',
    horario: 'Segunda a Sexta: 08h às 18h',
    siteUrl: 'https://www.goiania.go.gov.br/secretaria/secretaria-municipal-de-infraestrutura-urbana/',
    descricao: 'Execução de obras públicas, pavimentação asfáltica, manutenção de vias públicas, drenagem e iluminação pública.'
  },
  {
    id: 'smt',
    sigla: 'SMT',
    nome: 'Secretaria Municipal de Engenharia de Trânsito',
    titular: 'Tarcísio Abreu',
    cargo: 'Secretário Municipal de Trânsito',
    tipo: 'secretaria',
    telefone: '(62) 3524-1222',
    email: 'smt@goiania.go.gov.br',
    endereco: 'Rua 249, Qd. 93, Lt. 03 - Setor Coimbra, Goiânia - GO',
    horario: 'Segunda a Sexta: 08h às 18h',
    siteUrl: 'https://www.goiania.go.gov.br/secretaria/secretaria-municipal-de-engenharia-de-transito/',
    descricao: 'Fiscalização, planejamento do tráfego urbano, engenharia viária, semafórica e sinalização de trânsito da capital.'
  },
  {
    id: 'amma',
    sigla: 'AMMA',
    nome: 'Agência Municipal do Meio Ambiente',
    titular: 'Luan Alves',
    cargo: 'Presidente da AMMA',
    tipo: 'agencia',
    telefone: '(62) 3524-1412',
    email: 'amma@goiania.go.gov.br',
    endereco: 'Rua 75, nº 137 - Setor Central, Goiânia - GO',
    horario: 'Segunda a Sexta: 08h às 18h',
    siteUrl: 'https://www.goiania.go.gov.br/orgao/agencia-municipal-do-meio-ambiente/',
    descricao: 'Preservação de parques e áreas verdes, licenciamento ambiental, arborização urbana e fiscalização contra crimes ambientais.'
  },
  {
    id: 'semgov',
    sigla: 'SEMGOV',
    nome: 'Secretaria Municipal de Governo',
    titular: 'Jovair Arantes',
    cargo: 'Secretário de Governo',
    tipo: 'secretaria',
    telefone: '(62) 3524-3000',
    email: 'semgov@goiania.go.gov.br',
    endereco: 'Paço Municipal - Gabinete do Prefeito, Park Lozandes',
    horario: 'Segunda a Sexta: 08h às 18h',
    siteUrl: 'https://www.goiania.go.gov.br/secretaria/secretaria-municipal-de-governo/',
    descricao: 'Articulação política, relações institucionais com os poderes legislativo e judiciário e coordenação estratégica das ações de governo.'
  },
  {
    id: 'casacivil',
    sigla: 'CASA CIVIL',
    nome: 'Secretaria Municipal da Casa Civil',
    titular: 'Marcela Araújo Teixeira',
    cargo: 'Secretária da Casa Civil',
    tipo: 'secretaria',
    telefone: '(62) 3524-3010',
    email: 'casacivil@goiania.go.gov.br',
    endereco: 'Paço Municipal - Bloco F, Park Lozandes',
    horario: 'Segunda a Sexta: 08h às 18h',
    siteUrl: 'https://www.goiania.go.gov.br/casa-civil/',
    descricao: 'Publicação do Diário Oficial do Município, elaboração de atos normativos, decretos, sanção de leis e suporte jurídico direto ao prefeito.'
  },
  {
    id: 'seplanh',
    sigla: 'SEPLANH',
    nome: 'Secretaria Municipal de Planejamento Urbano e Habitação',
    titular: 'Valfran Ribeiro',
    cargo: 'Secretário de Planejamento Urbano',
    tipo: 'secretaria',
    telefone: '(62) 3524-6300',
    email: 'seplanh@goiania.go.gov.br',
    endereco: 'Av. do Cerrado, 999 - Bloco E, Park Lozandes',
    horario: 'Segunda a Sexta: 08h às 18h',
    siteUrl: 'https://www.goiania.go.gov.br/secretaria/secretaria-municipal-de-planejamento-urbano-e-habitacao/',
    descricao: 'Plano Diretor, aprovação de projetos arquitetônicos, regularização fundiária, uso do solo e programas habitacionais de interesse social.'
  },
  {
    id: 'comurg',
    sigla: 'COMURG',
    nome: 'Companhia de Urbanização de Goiânia',
    titular: 'Rodolpho Bueno',
    cargo: 'Presidente da Comurg',
    tipo: 'orgao',
    telefone: '(62) 3524-8500',
    email: 'comurg@goiania.go.gov.br',
    endereco: 'Av. Nazareno, s/n - Setor Faiçalville, Goiânia - GO',
    horario: 'Segunda a Sexta: 07h às 17h',
    siteUrl: 'https://www.goiania.go.gov.br/orgao/comurg/',
    descricao: 'Coleta de lixo, varrição, limpeza urbana, poda de árvores e manutenção de praças e canteiros centrais da cidade.'
  },
  {
    id: 'procon',
    sigla: 'PROCON',
    nome: 'Procon Municipal de Goiânia',
    titular: 'Carolina Alves Pereira',
    cargo: 'Presidente do Procon Goiânia',
    tipo: 'orgao',
    telefone: '(62) 3524-2942 / 151',
    email: 'procon@goiania.go.gov.br',
    endereco: 'Av. Tocantins, nº 191 - Setor Central, Goiânia - GO',
    horario: 'Segunda a Sexta: 08h às 17h',
    siteUrl: 'https://www.goiania.go.gov.br/orgao/procon-municipal/',
    descricao: 'Defesa e proteção dos direitos do consumidor, fiscalização comercial e atendimento a reclamações de consumo na capital.'
  }
];

export interface ServiceItem {
  id: string;
  titulo: string;
  categoria: 'tributos' | 'cidadao' | 'empresa' | 'servidor' | 'urbanismo';
  descricao: string;
  link: string;
  orgao: string;
  online: boolean;
}

export const SERVICOS_LIST: ServiceItem[] = [
  {
    id: 'iptu-itu',
    titulo: 'Emissão de DUAM - IPTU e ITU',
    categoria: 'tributos',
    descricao: 'Consulte débitos, emita parcelas do ano corrente e segundas vias do Imposto Predial e Territorial Urbano.',
    link: 'https://www.goiania.go.gov.br/sing_servicos/emissao-duam-itu-iptu-issqn/',
    orgao: 'Secretaria da Fazenda',
    online: true
  },
  {
    id: 'nfe',
    titulo: 'Nota Fiscal de Serviços Eletrônica (NFS-e)',
    categoria: 'empresa',
    descricao: 'Emissão, consulta e cancelamento de notas fiscais eletrônicas para prestadores de serviço.',
    link: 'https://www.goiania.go.gov.br/sing_servicos/nota-fiscal-eletronica/',
    orgao: 'Secretaria da Fazenda',
    online: true
  },
  {
    id: 'atende-facil',
    titulo: 'Agendamento Atende Fácil',
    categoria: 'cidadao',
    descricao: 'Agende seu atendimento presencial nas unidades do Atende Fácil (Paço, Cidade Jardim, Praça da Bíblia, Mangalô e Estação Ferroviária).',
    link: 'http://agendamento.goiania.go.gov.br/agendamento/#/home',
    orgao: 'Secretaria de Administração',
    online: true
  },
  {
    id: 'portal-contribuinte',
    titulo: 'Portal do Contribuinte e Parcelamento',
    categoria: 'tributos',
    descricao: 'Parcelamento de débitos tributários, dívida ativa da Procuradoria Geral e certidões negativas.',
    link: 'https://www.goiania.go.gov.br/sing_servicos/portal-do-contribuinte/',
    orgao: 'Secretaria da Fazenda / PGM',
    online: true
  },
  {
    id: 'diario-oficial',
    titulo: 'Diário Oficial do Município',
    categoria: 'cidadao',
    descricao: 'Acesso às edições diárias, leis sancionadas, decretos executivos e portarias da Prefeitura.',
    link: 'https://www.goiania.go.gov.br/casa-civil/',
    orgao: 'Casa Civil',
    online: true
  },
  {
    id: 'consulta-processos',
    titulo: 'Consulta de Processos Administrativos',
    categoria: 'cidadao',
    descricao: 'Acompanhe a tramitação de processos físicos e digitais abertos em qualquer órgão da administração.',
    link: 'https://www.goiania.go.gov.br/consulta-processos/',
    orgao: 'Secretaria de Governo',
    online: true
  },
  {
    id: 'empresa-facil',
    titulo: 'Empresa Fácil - Alvará de Localização',
    categoria: 'empresa',
    descricao: 'Abertura, alteração cadastral e emissão simplificada de alvará de funcionamento empresarial.',
    link: 'https://www.goiania.go.gov.br/sing_servicos/alvara-de-localizacao-e-funcionamento-empresa-facil/',
    orgao: 'Secretaria da Fazenda / SEDETEC',
    online: true
  },
  {
    id: 'licenca-ambiental',
    titulo: 'Licença Ambiental Fácil',
    categoria: 'empresa',
    descricao: 'Licenciamento de impacto local para empreendimentos comerciais e industriais de baixo risco.',
    link: 'https://www.goiania.go.gov.br/sing_servicos/licenca-ambiental-facil/',
    orgao: 'AMMA',
    online: true
  },
  {
    id: 'portal-servidor',
    titulo: 'Portal do Servidor Municipal',
    categoria: 'servidor',
    descricao: 'Contracheque digital, informes de rendimentos, ficha financeira e requerimentos de RH.',
    link: 'https://www.goiania.go.gov.br/sistemas/saces/asp/saces00000f0.asp?sigla=sipsm',
    orgao: 'Secretaria de Administração',
    online: true
  },
  {
    id: 'uso-do-solo',
    titulo: 'Consulta de Uso do Solo',
    categoria: 'urbanismo',
    descricao: 'Informações sobre zoneamento urbano, restrições construtivas e viabilidade de atividades por lote.',
    link: 'http://simplificagoiania.com.br/simplificagoiania/portal/',
    orgao: 'SEPLANH',
    online: true
  },
  {
    id: 'multas-transito',
    titulo: 'Recurso Administrativo de Multas',
    categoria: 'cidadao',
    descricao: 'Interposição de recurso contra infrações de trânsito emitidas no perímetro urbano municipal.',
    link: 'https://www.goiania.go.gov.br/sing_servicos/recurso-administrativo-de-multas/',
    orgao: 'SMT',
    online: true
  },
  {
    id: 'mapa-360',
    titulo: 'Mapa 360° Goiânia',
    categoria: 'urbanismo',
    descricao: 'Plataforma geoespacial e imagens aéreas panorâmicas em 360 graus de toda a malha urbana.',
    link: 'https://portal-goiania.geo360.com.br/',
    orgao: 'SEPLANH',
    online: true
  }
];

export interface TransparenciaItem {
  id: string;
  titulo: string;
  descricao: string;
  link: string;
  badge: string;
}

export const TRANSPARENCIA_LIST: TransparenciaItem[] = [
  {
    id: 'receitas-despesas',
    titulo: 'Receitas e Despesas',
    descricao: 'Consulta em tempo real de empenhos, liquidações, pagamentos e arrecadação de tributos.',
    link: 'https://www.goiania.go.gov.br/transparencia/?filtro_simplificado=categoria&categoria=49',
    badge: 'Financeiro'
  },
  {
    id: 'licitacoes-contratos',
    titulo: 'Licitações e Contratos',
    descricao: 'Editais, pregões eletrônicos, concorrências, atas de registro de preço e termos aditivos.',
    link: 'https://www.goiania.go.gov.br/sing_transparencia/licitacoes/',
    badge: 'Compras Públicas'
  },
  {
    id: 'folha-pagamento',
    titulo: 'Quadro de Pessoal e Remunerações',
    descricao: 'Tabela salarial, remuneração nominal dos servidores públicos municipais e cargos em comissão.',
    link: 'https://www.goiania.go.gov.br/transparencia/?filtro_simplificado=categoria&categoria=55',
    badge: 'Recursos Humanos'
  },
  {
    id: 'lrf',
    titulo: 'Relatórios de Gestão Fiscal (LRF)',
    descricao: 'RGF, Relatório Resumido da Execução Orçamentária (RREO) e prestações de contas oficiais.',
    link: 'https://www.goiania.go.gov.br/transparencia?filtro_simplificado=categoria&categoria=52',
    badge: 'Fiscal'
  },
  {
    id: 'sic',
    titulo: 'Serviço de Informação ao Cidadão (e-SIC)',
    descricao: 'Pedido de acesso à informação nos termos da Lei Federal nº 12.527/2011 (LAI).',
    link: 'https://www.goiania.go.gov.br/ouvidoria-e-sic/servico-informacao-cidadao/',
    badge: 'Acesso à Informação'
  },
  {
    id: 'obras-publicas',
    titulo: 'Painel de Obras Públicas',
    descricao: 'Acompanhamento do cronograma, empresas executoras e medições das obras civis municipais.',
    link: 'https://www.goiania.go.gov.br/transparencia/',
    badge: 'Infraestrutura'
  }
];
