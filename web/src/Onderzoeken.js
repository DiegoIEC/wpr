const researchData = [
  {
    id: 1,
    title: 'Toegankelijkheid van Bol.com voor Senioren en Slechtziende',
    type: 'Enquête',
    description: 'Kunnen gebruikers gemakkelijk winkelen op onze site, onderzoek bestaat uit een enquête om ervaringen en feedback vast te leggen.',
    tags: ['Senior', 'Slechtziend'],
    logo: 'bol-logo.png' // Make sure to have this image in your public/assets folder
  },
  {
    id: 2,
    title: 'Gemeente Den Haag website',
    type: 'Interview',
    description: 'Interview over de gebruikservaring van de website van gemeente Den Haag.',
    tags: ['Senior', 'Slechtziend', 'Jongeren', 'Motorische beperking'],
    logo: 'den-haag-logo.png'
  },
  // ... more research data
];


const Onderzoeken = () => {
    return (
      <div className="research-list">
        <h1>Onderzoeken</h1>
        {researchData.map((research) => (
          <div key={research.id} className="research-item">
            <h2>{research.title}</h2>
            <p>Type: {research.type}</p>
            <p>{research.description}</p>
            <div className="tags">
              {research.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            <img src={`/${research.logo}`} alt={research.title} />
          </div>
        ))}
      </div>
    );
  };
  
  export default Onderzoeken;