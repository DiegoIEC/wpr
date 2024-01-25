import React, { useState, useEffect } from 'react';

const DeskundigenList = () => {
  const [deskundigen, setDeskundigen] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDeskundige, setSelectedDeskundige] = useState(null);

  useEffect(() => {
    const fetchDeskundigen = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://20.199.89.238:8088/api/deskundige');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setDeskundigen(data);
      } catch (error) {
        console.error('Failed to fetch deskundigen:', error);
      }
      setIsLoading(false);
    };

    fetchDeskundigen();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleRowClick = (deskundige) => {
    setSelectedDeskundige(deskundige.userId);
  };
  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>UserId</th>
            <th>Postcode</th>
            <th>Beperkingen</th>
            <th>Benadering Voorkeur</th>
          </tr>
        </thead>
        <tbody>
          {deskundigen.map(deskundige => (
            <tr 
              key={deskundige.userId}
              className={selectedDeskundige === deskundige.userId ? 'selected' : ''}
              onClick={() => handleRowClick(deskundige)}
            >
              <td>{deskundige.userId}</td>
              <td>{deskundige.postcode}</td>
              <td>{deskundige.beperkingenIds.join(', ')}</td>
              <td>{deskundige.benaderingVoorkeur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeskundigenList;
