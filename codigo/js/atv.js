
const motivationalQuotes = [
    "O sucesso é a soma de pequenos esforços repetidos dia após dia. - Robert Collier",
    "Acredite em si mesmo e tudo será possível. - Anonymous",
    "Não espere por uma crise para descobrir o que é importante em sua vida. - Platão",
    "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo. - Winston Churchill",
    "Nada é impossível, a palavra em si diz 'eu sou possível'! - Audrey Hepburn",
    "Se você quer alcançar grandes coisas, você precisa sair da sua zona de conforto.",
    "A disciplina é a ponte entre metas e realizações.",
    "A única forma de fazer um excelente trabalho é amar o que você faz. - Steve Jobs",
    "Você é mais corajoso do que acredita, mais forte do que parece e mais inteligente do que pensa.",
    "A diferença entre o possível e o impossível está na determinação de uma pessoa. - Tommy Lasorda",
    "O que você faz hoje pode melhorar todos os seus amanhãs. - Ralph Marston",
    "Acredite que você pode e você já está no meio do caminho. - Theodore Roosevelt",
    "O segredo para começar é dividir as tarefas grandes e complicadas em tarefas pequenas e simples. - Mark Twain",
    "O único lugar onde o sucesso vem antes do trabalho é no dicionário. - Vidal Sassoon",
    "A verdadeira medida de sucesso é o quanto você contribuiu para o bem comum. - Vince Lombardi",
    "O sucesso não é a chave para a felicidade. A felicidade é a chave para o sucesso. Se você ama o que faz, você será bem-sucedido. - Albert Schweitzer",
    "Seja feliz com o que você tem, enquanto persegue o que você quer. - Jim Rohn",
    "O caminho para o sucesso e o caminho para o fracasso são quase os mesmos. - Colin R. Davis",
    "A persistência é o menor caminho do progresso. - Charles Chaplin",
    "A verdadeira oportunidade para o sucesso reside na pessoa que você usa para superar o fracasso. - Abraham Lincoln",
    "Você é mais corajoso do que você acredita, mais forte do que parece, e mais inteligente do que você imagina. - A.A. Milne"
];


function getMotivationalQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
}


function showMotivationalQuote() {
    const quoteElement = document.getElementById('motivationalQuote');
    const quote = getMotivationalQuote();
    quoteElement.textContent = quote;
}


document.getElementById('btnNovaFrase').addEventListener('click', showMotivationalQuote);


document.addEventListener('DOMContentLoaded', function() {
    showMotivationalQuote();
    carregarReflexoes();
});


document.getElementById('btnSalvarDiario').addEventListener('click', function() {
    const diaryEntry = document.getElementById('diaryEntry').value;
    if (diaryEntry.trim()) {
    
        let diaryEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        
        
        diaryEntries.push({
            entry: diaryEntry,
            date: new Date().toLocaleString() 
        });

        
        localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
        
        alert('Sua reflexão foi salva com sucesso!');
        
       
        document.getElementById('diaryEntry').value = ''; 
        
       
        carregarReflexoes();
    } else {
        alert('Por favor, escreva algo antes de salvar.');
    }
});


function carregarReflexoes() {
    const diaryEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    const diaryEntriesContainer = document.getElementById('diaryEntries');
    

    diaryEntriesContainer.innerHTML = '';

   
    diaryEntries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = 'diary-entry';
        
        const entryText = document.createElement('p');
        entryText.textContent = entry.entry;
        
        const entryDate = document.createElement('span');
        entryDate.className = 'diary-entry-date';
        entryDate.textContent = `Salvo em: ${entry.date}`;
        
        entryElement.appendChild(entryText);
        entryElement.appendChild(entryDate);
        
        diaryEntriesContainer.appendChild(entryElement);
    });
}
