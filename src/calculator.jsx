import {useState} from 'react';


function Calculator() {
  const [useramount, setUseramount] = useState('');
  const [userinterest, setUserinterest] = useState('');
  const [userduration, setUserduration] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculatePayment = (amount, interest, duration) => {
  const monthlyInterest = Number(interest) / 100 / 12;
  const monthlyPayment = (Number(amount) * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -Number(duration)));
  return monthlyPayment.toFixed(2);
  }
  
  return (
    <div className="calculator-container">
      <h1>Loan Calculator</h1>
      <input
        type="number"
        className="loanamount-input"
        placeholder="Loan Amount(€)"
        value={useramount}
        onChange={(e) => setUseramount(e.target.value)}
      />
      <input
        type="number"
        className="interest-input"
        placeholder="Interest Rate(%)"
        value={userinterest}
        max="100"
        min="0"
        onChange={(e) => setUserinterest(e.target.value)}
        
      />
      <input
        type="number"
        className="duration-input"
        placeholder="Duration(in months)"
        value={userduration}
        onChange={(e) => setUserduration(e.target.value)}
      />
      {monthlyPayment === null && (
      <button
            className="calculate-button"
            onClick={() => {
                if (Number(useramount) <= 0) {
                    alert("Please enter a valid loan amount.");
                    return;
                }
                if (Number(useramount) > 100000) {
                    alert("Loan amount must be under €100,000.");
                    return;
                }
                if (Number(userinterest) <= 0) {
                    alert("Interest rate must be greater than 0%.");
                    return;
                }
                if (Number(userinterest) > 100) {
                alert("Interest rate must be under 100%");
                return;
                }
                if(Number(userduration) <= 0) {
                    alert("Please enter a valid loan duration.");
                    return;
                }
                if(Number(userduration) >= 120) {
                    alert("Loan duration must be under 120 months.");
                    return;
                }
              const payment = calculatePayment(useramount, userinterest, userduration);
              setMonthlyPayment(payment);
            }}>Calculate</button>
          )}
            
      {monthlyPayment != null && (
     <button
            className="reset-button"
            onClick={() => {
              setMonthlyPayment(null);
            }}>Reset</button>
          )}
            
            {monthlyPayment && <div className="monthlyPayment">Monthly Payment: €{monthlyPayment}</div>}
    </div>
  );
} 

export default Calculator;


