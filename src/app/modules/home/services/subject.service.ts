import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  getSubjectData(subject: string) {
    switch (subject) {
      case 'portuguese':
        return {
          title: 'Língua Portuguesa',
          overview: 'A Língua Portuguesa é um idioma de ampla utilização em vários países. Ela é essencial para a comunicação, literatura e cultura. Nesta disciplina, estudaremos suas principais características, como gramática, ortografia e interpretação de textos, aprimorando habilidades de escrita e comunicação eficaz.',
          subTopics: [
            'Gramática: Estudaremos as regras e estruturas da língua portuguesa, incluindo os tempos verbais, a concordância nominal e verbal, e a pontuação.',
            'Ortografia: Exploraremos as regras ortográficas, incluindo o uso correto das letras, acentuação e pontuação.',
            'Interpretação de Textos: Desenvolveremos habilidades de leitura crítica, compreensão e análise de diversos tipos de textos.',
            'Figuras de Linguagem: Estudo das diversas figuras de linguagem, como metáfora, metonímia, hipérbole, personificação, entre outras, e sua aplicação em textos.'
          ],
          details: [
            {
              name: 'Gramática',
              description: 'Nesse tópico, estudaremos as regras e estruturas da língua portuguesa, incluindo os tempos verbais, a concordância nominal e verbal, e a pontuação.',
              example: 'Exemplo: O uso correto do pretérito perfeito do indicativo: Eu cantei, tu cantaste, ele cantou.'
            },
            {
              name: 'Ortografia',
              description: 'Nesse tópico, exploraremos as regras ortográficas da língua portuguesa, incluindo o uso correto das letras, acentuação e pontuação.',
              example: 'Exemplo: A aplicação das regras de acentuação em palavras oxítonas, paroxítonas e proparoxítonas.'
            },
            {
              name: 'Interpretação de Textos',
              description: 'Nesse tópico, desenvolveremos habilidades de leitura crítica, compreensão e análise de diversos tipos de textos em língua portuguesa.',
              example: 'Exemplo: Análise de um texto argumentativo para identificar as principais ideias defendidas pelo autor e os argumentos utilizados.'
            },
            {
              name: 'Figuras de Linguagem',
              description: 'Nesse tópico, estudaremos as diversas figuras de linguagem, como metáfora, metonímia, hipérbole, personificação, entre outras, e sua aplicação em textos.',
              example: 'Exemplo: Identificação de uma metáfora em uma poesia para entender o sentido figurado utilizado pelo autor.'
            }
          ]
        };
      case 'mathematics':
        return {
          title: 'Matemática',
          overview: 'A matemática é uma disciplina fundamental que estuda números, quantidades, estruturas, espaço e mudanças. É uma das áreas mais antigas do conhecimento humano e desempenha um papel essencial em diversas áreas da ciência, tecnologia, engenharia e economia. Nessa matéria, vamos explorar os principais conceitos e tópicos matemáticos, desenvolvendo habilidades de raciocínio lógico e resolução de problemas.',
          subTopics: [
            'Equação de 1º Grau: Estudaremos como resolver e trabalhar com equações lineares de primeiro grau.',
            'Teorema de Pitágoras: Exploraremos o famoso teorema que relaciona os lados de um triângulo retângulo.',
            'Probabilidade: Introduziremos os conceitos básicos de probabilidade e sua aplicação em eventos aleatórios.',
            'Cálculo de Áreas: Abordaremos os métodos para calcular áreas de figuras geométricas, como quadrados, retângulos, triângulos e círculos.'
          ],
          details: [
            {
              name: 'Equação de 1º Grau',
              description: 'Nesse tópico, estudaremos como resolver e trabalhar com equações lineares de primeiro grau. Uma equação de 1º grau é uma igualdade algébrica que contém apenas uma variável elevada à primeira potência e não possui termos de grau maior.',
              example: 'Exemplo: 3x + 5 = 11.'
            },
            {
              name: 'Teorema de Pitágoras',
              description: 'Esse tópico explora o famoso teorema matemático que relaciona os lados de um triângulo retângulo. O teorema de Pitágoras afirma que a soma dos quadrados das medidas dos catetos é igual ao quadrado da medida da hipotenusa em um triângulo retângulo.',
              example: 'Exemplo: Em um triângulo retângulo com catetos de comprimento 3 e 4, a hipotenusa terá comprimento 5 (3² + 4² = 5²).'
            },
            {
              name: 'Probabilidade',
              description: 'Aqui, introduziremos os conceitos básicos de probabilidade e sua aplicação em eventos aleatórios. A probabilidade é uma medida numérica da chance de um evento ocorrer.',
              example: 'Exemplo: Ao lançar um dado, a probabilidade de obter um número par é 1/2, pois existem três números pares (2, 4 e 6) em um total de seis possibilidades.'
            },
            {
              name: 'Cálculo de Áreas',
              description: 'Nesse tópico, abordaremos os métodos para calcular áreas de figuras geométricas, como quadrados, retângulos, triângulos e círculos. O cálculo de áreas é fundamental para diversas aplicações, desde a geometria até áreas práticas como a construção civil.',
              example: 'Exemplo: A área de um retângulo com base de comprimento 8 e altura de comprimento 5 é calculada multiplicando-se os lados: 8 * 5 = 40 unidades de área.'
            }
          ]
        };
      case 'sciences':
        return {
          title: 'Ciências Naturais',
          overview: 'As Ciências Naturais são uma área do conhecimento que estuda os fenômenos naturais, incluindo os seres vivos, o meio ambiente, a Terra, o universo e suas interações. Nessa disciplina, vamos explorar os principais conceitos e tópicos das ciências naturais, desenvolvendo uma compreensão dos processos naturais e sua relevância para a vida e o mundo ao nosso redor.',
          subTopics: [
            'Biologia: Estudaremos os seres vivos, sua estrutura, função, classificação e interações com o ambiente.',
            'Física: Exploraremos as leis fundamentais da física, como movimento, energia, eletricidade e magnetismo.',
            'Química: Introduziremos os princípios básicos da química, como átomos, elementos, compostos e reações químicas.',
            'Ecologia: Abordaremos as relações dos seres vivos com o meio ambiente e a importância da conservação e sustentabilidade.'
          ],
          details: [
            {
              name: 'Biologia',
              description: 'Nesse tópico, estudaremos os seres vivos, sua estrutura, função, classificação e interações com o ambiente.',
              example: 'Exemplo: Na biologia, aprenderemos sobre a anatomia dos animais e plantas, seus sistemas e como se adaptam ao meio ambiente.'
            },
            {
              name: 'Física',
              description: 'Nesse tópico, exploraremos as leis fundamentais da física, como movimento, energia, eletricidade e magnetismo.',
              example: 'Exemplo: Na física, aprenderemos sobre as leis de Newton que explicam o movimento dos corpos e a conservação de energia.'
            },
            {
              name: 'Química',
              description: 'Nesse tópico, introduziremos os princípios básicos da química, como átomos, elementos, compostos e reações químicas.',
              example: 'Exemplo: Na química, aprenderemos sobre a tabela periódica, as reações químicas e como identificar diferentes substâncias.'
            },
            {
              name: 'Ecologia',
              description: 'Nesse tópico, abordaremos as relações dos seres vivos com o meio ambiente e a importância da conservação e sustentabilidade.',
              example: 'Exemplo: Na ecologia, aprenderemos sobre os ecossistemas, as cadeias alimentares e como preservar a biodiversidade.'
            }
          ]
        };
      case 'history':
        return {
          title: 'História',
          overview: 'A História é a disciplina que estuda os eventos, pessoas, culturas e sociedades do passado. Ela nos ajuda a compreender como o mundo evoluiu ao longo do tempo e como os acontecimentos passados moldaram o presente. Nessa matéria, vamos explorar os principais períodos, acontecimentos e figuras históricas, desenvolvendo uma perspectiva histórica e uma apreciação pela diversidade cultural e social.',
          subTopics: [
            'Pré-História: Estudaremos os primeiros seres humanos, suas formas de vida, ferramentas e a transição para a vida em sociedade.',
            'Idade Antiga: Exploraremos as civilizações antigas, como egípcios, gregos, romanos e suas contribuições para a história.',
            'Idade Média: Analisaremos o período medieval, incluindo o feudalismo, as cruzadas, o renascimento comercial e cultural.',
            'Idade Moderna e Contemporânea: Abordaremos os principais acontecimentos da Idade Moderna e Contemporânea, como as grandes navegações, a Revolução Industrial, as guerras mundiais e os movimentos sociais.'
          ],
          details: [
            {
              name: 'Pré-História',
              description: 'Nesse tópico, estudaremos os primeiros seres humanos, suas formas de vida, ferramentas e a transição para a vida em sociedade.',
              example: 'Exemplo: Durante a Pré-História, os seres humanos eram nômades e dependiam da caça, coleta e pesca para sobreviver.'
            },
            {
              name: 'Idade Antiga',
              description: 'Nesse tópico, exploraremos as civilizações antigas, como egípcios, gregos, romanos e suas contribuições para a história.',
              example: 'Exemplo: Os egípcios construíram as famosas pirâmides e desenvolveram a escrita hieroglífica.'
            },
            {
              name: 'Idade Média',
              description: 'Nesse tópico, analisaremos o período medieval, incluindo o feudalismo, as cruzadas, o renascimento comercial e cultural.',
              example: 'Exemplo: Durante a Idade Média, o feudalismo organizava a sociedade em feudos governados por senhores feudais.'
            },
            {
              name: 'Idade Moderna e Contemporânea',
              description: 'Nesse tópico, abordaremos os principais acontecimentos da Idade Moderna e Contemporânea, como as grandes navegações, a Revolução Industrial, as guerras mundiais e os movimentos sociais.',
              example: 'Exemplo: A Revolução Industrial transformou a produção e a economia, impulsionando a urbanização e o surgimento de novas tecnologias.'
            }
          ]
        };
      case 'geography':
        return {
          title: 'Geografia',
          overview: 'A Geografia é uma disciplina que estuda o espaço, o ambiente e as relações entre as pessoas e o meio em que vivem. Ela nos ajuda a compreender os aspectos físicos, sociais, econômicos e culturais do mundo. Nessa matéria, vamos explorar os principais conceitos geográficos, como relevo, clima, população, economia e globalização, desenvolvendo uma compreensão das interações entre os lugares e as questões geográficas contemporâneas.',
          subTopics: [
            'Relevo e Hidrografia: Estudaremos as formas de relevo da Terra, como montanhas, planícies, rios e oceanos, e sua influência na distribuição dos seres vivos e das atividades humanas.',
            'Clima e Vegetação: Exploraremos os diferentes tipos de clima e vegetação do planeta, suas características e influências na biodiversidade e nas atividades humanas.',
            'População e Migração: Analisaremos os padrões de distribuição da população mundial, os movimentos migratórios e suas causas e consequências sociais, econômicas e culturais.',
            'Economia e Globalização: Abordaremos os sistemas econômicos, as atividades produtivas, o comércio internacional e a interdependência global, destacando as desigualdades e os desafios socioambientais.'
          ],
          details: [
            {
              name: 'Relevo e Hidrografia',
              description: 'Nesse tópico, estudaremos as formas de relevo da Terra, como montanhas, planícies, rios e oceanos, e sua influência na distribuição dos seres vivos e das atividades humanas.',
              example: 'Exemplo: A cordilheira dos Andes é uma importante formação de relevo que se estende pela América do Sul e influencia o clima e a biodiversidade da região.'
            },
            {
              name: 'Clima e Vegetação',
              description: 'Nesse tópico, exploraremos os diferentes tipos de clima e vegetação do planeta, suas características e influências na biodiversidade e nas atividades humanas.',
              example: 'Exemplo: A Floresta Amazônica é conhecida por sua rica biodiversidade e é considerada o "pulmão do mundo" devido à produção de oxigênio e ao sequestro de carbono.'
            },
            {
              name: 'População e Migração',
              description: 'Nesse tópico, analisaremos os padrões de distribuição da população mundial, os movimentos migratórios e suas causas e consequências sociais, econômicas e culturais.',
              example: 'Exemplo: O Êxodo Rural é um fenômeno de migração da população do campo para a cidade em busca de melhores condições de vida e oportunidades de emprego.'
            },
            {
              name: 'Economia e Globalização',
              description: 'Nesse tópico, abordaremos os sistemas econômicos, as atividades produtivas, o comércio internacional e a interdependência global, destacando as desigualdades e os desafios socioambientais.',
              example: 'Exemplo: A globalização tem facilitado o comércio entre países, mas também pode gerar desigualdades socioeconômicas e impactos ambientais negativos.'
            }
          ]
        };
      default:
        return null;
    }
  }
}
