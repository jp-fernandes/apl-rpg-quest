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
          ]
        };
      default:
        return null;
    }
  }
}
