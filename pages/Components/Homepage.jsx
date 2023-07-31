import React, { useState , useEffect} from 'react';
import ChartComponent from './Chart.Component';

const Homepage = ({ mode, handleToggleMode, heading}) => {

  
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  const [Capital, setCapital] = useState('100000');
  const handleCapitalChange = (event) => {
    setCapital(event.target.value);
  };
  const handleIncrementCapital = () => {
    setCapital(Number(Capital) + 100);
  };
  const handleDecrementCapital = () =>{
    if (Capital > 100) {
      setCapital(Number(Capital) - 100);
    }
  }

  const [Sip, setSip] = useState('10000');
  const handleSipChange = (event) => {
    setSip(event.target.value);
  };
  const handleSipIncrement = ()=>{
    setSip(Number(Sip)+50)
  }
  const handleSipDecrement = ()=>{
    if (Sip>=50) {
      setSip(Number(Sip) - 50);
    }
  }
  const [Period, setPeriod] = useState('10');
  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };
  const handlePeriodIncrement = ()=>{
    setPeriod(Number(Period)+1)
  }
  const handlePeriodDecrement =()=>{
    if (Period>=1) {
      setPeriod(Number(Period) - 1);
    }
  }

  const [Rate, setRate] = useState('15');
  const handleRateChange = (event) => {
    setRate(event.target.value);
  };
  const handleRateIncrement = ()=>{
    setRate(Number(Rate)+1)
  }
  const handleRateDecrement = ()=>{
    if (Period>=1) {
      setRate(Number(Rate) - 1);
    } 
  }

  const [Compounding, setCompounding] = useState('Yearly');
  const handleCompoundingChange = (event) => {
    setCompounding(event.target.value);
  };

  const [S, setS] = useState([]);
  const [A, setA] = useState([]);
  const [I, setI] = useState([]);
  const [T, setT] = useState('');

  const answer = (event) => {
    event.preventDefault(); 
    if (Capital === '' || Sip === '' || Period === '' || Rate === '') {
      setT('');
      alert('Fill All the Details');
    } else {
      var calculateInvestment = function (
        principalAmount,
        monthlySipAmount,
        interestRate,
        investmentPeriod,
        compoundingFrequency
      ) {
        if (compoundingFrequency === 'Yearly') {
          var totalAmount = principalAmount;
          var yearlyInterestRate = interestRate / 100;
          var years = Math.floor(investmentPeriod);
          var months = Math.round((investmentPeriod - years) * 12);

          var sNoArray = [];
          var totalAmountArray = [];
          var interestArray = [];

          for (var i = 1; i <= years; i++) {
            var yearlyInterest = totalAmount * yearlyInterestRate;
            totalAmount += yearlyInterest;
            totalAmount += monthlySipAmount * 12;

            sNoArray.push('Year ' + i);
            totalAmountArray.push(totalAmount.toFixed(2));
            interestArray.push(yearlyInterest.toFixed(2));
          }

          if (months > 0) {
            var monthlyInterestRate = yearlyInterestRate / 12;
            var monthlyInvestmentPeriod = months / 12;
            var monthlyInterest = totalAmount * monthlyInterestRate * monthlyInvestmentPeriod;
            totalAmount += monthlyInterest;
            totalAmount += monthlySipAmount * months;

            sNoArray.push('Partial');
            totalAmountArray.push(totalAmount.toFixed(2));
            interestArray.push(monthlyInterest.toFixed(2));
          }

          setS(sNoArray);
          setA(totalAmountArray);
          setI(interestArray);

          // console.log('Yearly');
          // console.log(sNoArray);
          // console.log(totalAmountArray);
          // console.log(interestArray);

          return {
            sNoArray,
            totalAmountArray,
            interestArray,
            totalAmount: totalAmount.toFixed(2),
          };
        }
        else if (compoundingFrequency === 'Semiannually') {
          let totalAmount = principalAmount;
          let semiAnnualInterestRate = interestRate / 100 / 2;
          let years = Math.floor(investmentPeriod);
          let remainingPeriods = (investmentPeriod - years) * 2;
          let sNoArray = [];
          let totalAmountArray = [];
          let interestArray = [];
        
          for (let i = 1; i <= years * 2; i++) {
            let semiAnnualInterest = totalAmount * semiAnnualInterestRate;
            totalAmount += semiAnnualInterest;
            totalAmount += monthlySipAmount * 6;
        
            sNoArray.push('Half Year ' + i);
            totalAmountArray.push(totalAmount.toFixed(2));
            interestArray.push(semiAnnualInterest.toFixed(2));
          }
        
          if (remainingPeriods > 0) {
            let monthlyInterestRate = semiAnnualInterestRate / 6;
            let monthlyInvestmentPeriod = remainingPeriods / 2;
            let monthlyInterest = totalAmount * monthlyInterestRate * monthlyInvestmentPeriod;
            totalAmount += monthlyInterest;
            totalAmount += monthlySipAmount * (remainingPeriods * 6);
        
            sNoArray.push('Partial');
            totalAmountArray.push(totalAmount.toFixed(2));
            interestArray.push(monthlyInterest.toFixed(2));
          }
        
          setS(sNoArray);
          setA(totalAmountArray);
          setI(interestArray);
        
          // console.log('Semiannually');
          // console.log(sNoArray);
          // console.log(totalAmountArray);
          // console.log(interestArray);
        
          return {
            sNoArray,
            totalAmountArray,
            interestArray,
            totalAmount: totalAmount.toFixed(2),
          };
        }
        else if (compoundingFrequency === 'Quarterly') {
          let totalAmount = principalAmount;
          let quarterlyInterestRate = interestRate / 100 / 4;
          let years = Math.floor(investmentPeriod);
          let remainingPeriods = (investmentPeriod - years) * 4;
          let sNoArray = [];
          let totalAmountArray = [];
          let interestArray = [];
        
          for (let i = 1; i <= years * 4; i++) {
            let quarterlyInterest = totalAmount * quarterlyInterestRate;
            totalAmount += quarterlyInterest;
            totalAmount += monthlySipAmount * 3;
        
            sNoArray.push('Quarter ' + i);
            totalAmountArray.push(totalAmount.toFixed(2));
            interestArray.push(quarterlyInterest.toFixed(2));
          }
        
          if (remainingPeriods > 0) {
            let monthlyInterestRate = quarterlyInterestRate / 3;
            let monthlyInvestmentPeriod = remainingPeriods / 4;
            let monthlyInterest = totalAmount * monthlyInterestRate * monthlyInvestmentPeriod;
            totalAmount += monthlyInterest;
            totalAmount += monthlySipAmount * (remainingPeriods * 3);
        
            sNoArray.push('Partial');
            totalAmountArray.push(totalAmount.toFixed(2));
            interestArray.push(monthlyInterest.toFixed(2));
          }
        
          setS(sNoArray);
          setA(totalAmountArray);
          setI(interestArray);
        
          // console.log('Quarterly');
          // console.log(sNoArray);
          // console.log(totalAmountArray);
          // console.log(interestArray);
        
          return {
            sNoArray,
            totalAmountArray,
            interestArray,
            totalAmount: totalAmount.toFixed(2),
          };
        }
        else if (compoundingFrequency === 'Monthly') {
          let totalAmount = principalAmount;
          let monthlyInterestRate = interestRate / 100 / 12;
          let years = Math.floor(investmentPeriod);
          let remainingPeriods = (investmentPeriod - years) * 12;
          let sNoArray = [];
          let totalAmountArray = [];
          let interestArray = [];
        
          for (let i = 1; i <= years * 12; i++) {
            let monthlyInterest = totalAmount * monthlyInterestRate;
            totalAmount += monthlyInterest;
            totalAmount += monthlySipAmount;
        
            sNoArray.push('Month ' + i);
            totalAmountArray.push(totalAmount.toFixed(2));
            interestArray.push(monthlyInterest.toFixed(2));
          }
        
          if (remainingPeriods > 0) {
            let additionalInterestRate = monthlyInterestRate / 12;
            let additionalInvestmentPeriod = remainingPeriods;
            let additionalInterest = totalAmount * additionalInterestRate * additionalInvestmentPeriod;
            totalAmount += additionalInterest;
            totalAmount += monthlySipAmount * remainingPeriods;
        
            sNoArray.push('Partial');
            totalAmountArray.push(totalAmount.toFixed(2));
            interestArray.push(additionalInterest.toFixed(2));
          }
        
          setS(sNoArray);
          setA(totalAmountArray);
          setI(interestArray);
        
          // console.log('Monthly');
          // console.log(sNoArray);
          // console.log(totalAmountArray);
          // console.log(interestArray);
        
          return {
            sNoArray,
            totalAmountArray,
            interestArray,
            totalAmount: totalAmount.toFixed(2),
          };
        }
        else if (compoundingFrequency === 'Weekly') {
          let totalAmount = principalAmount;
          let weeklyInterestRate = interestRate / 100 / 52;
          let years = Math.floor(investmentPeriod);
          let remainingPeriods = (investmentPeriod - years) * 52;
          let sNoArray = [];
          let totalAmountArray = [];
          let interestArray = [];
        
          for (let i = 1; i <= years * 52; i++) {
            let weeklyInterest = totalAmount * weeklyInterestRate;
            totalAmount += weeklyInterest;
            totalAmount += monthlySipAmount / 4;
        
            sNoArray.push('Week ' + i);
            totalAmountArray.push(totalAmount.toFixed(2));
            interestArray.push(weeklyInterest.toFixed(2));
          }
        
          if (remainingPeriods > 0) {
            let additionalInterestRate = weeklyInterestRate / 4;
            let additionalInvestmentPeriod = remainingPeriods;
            let additionalInterest = totalAmount * additionalInterestRate * additionalInvestmentPeriod;
            totalAmount += additionalInterest;
            totalAmount += monthlySipAmount / 4 * remainingPeriods;
        
            sNoArray.push('Partial');
            totalAmountArray.push(totalAmount.toFixed(2));
            interestArray.push(additionalInterest.toFixed(2));
          }
        
          setS(sNoArray);
          setA(totalAmountArray);
          setI(interestArray);
        
          // console.log('Weekly');
          // console.log(sNoArray);
          // console.log(totalAmountArray);
          // console.log(interestArray);
        
          return {
            sNoArray,
            totalAmountArray,
            interestArray,
            totalAmount: totalAmount.toFixed(2),
          };
        }
        else if (compoundingFrequency === 'Daily') {
          let totalAmount = principalAmount;
          let dailyInterestRate = interestRate / 100 / 365;
          let years = Math.floor(investmentPeriod);
          let remainingPeriods = (investmentPeriod - years) * 365;
          let sNoArray = [];
          let totalAmountArray = [];
          let interestArray = [];
        
          for (let i = 1; i <= years * 365; i++) {
            let dailyInterest = totalAmount * dailyInterestRate;
            totalAmount += dailyInterest;
            totalAmount += monthlySipAmount / 30;
        
            sNoArray.push('Day ' + i);
            totalAmountArray.push(totalAmount.toFixed(2));
            interestArray.push(dailyInterest.toFixed(2));
          }
        
          if (remainingPeriods > 0) {
            let additionalInterestRate = dailyInterestRate / 30;
            let additionalInvestmentPeriod = remainingPeriods;
            let additionalInterest = totalAmount * additionalInterestRate * additionalInvestmentPeriod;
            totalAmount += additionalInterest;
            totalAmount += monthlySipAmount / 30 * remainingPeriods;
        
            sNoArray.push('Partial');
            totalAmountArray.push(totalAmount.toFixed(2));
            interestArray.push(additionalInterest.toFixed(2));
          }
        
          // console.log('Daily');
          // console.log(sNoArray);
          // console.log(totalAmountArray);
          // console.log(interestArray);
        
          // Update state variables with the data
          setS(sNoArray);
          setA(totalAmountArray);
          setI(interestArray);
        
          return {
            sNoArray,
            totalAmountArray,
            interestArray,
            totalAmount: totalAmount.toFixed(2),
          };
        }
        
              
        
};

      let total = calculateInvestment(parseFloat(Capital), parseFloat(Sip), parseFloat(Rate), parseFloat(Period), Compounding);
      // console.log('After calculation');
      // // console.log(sNoArray);
      // // console.log(totalAmountArray);
      // // console.log(interestArray);
      setT(total.totalAmount);
      // console.log('totalAmount = ' + total.totalAmount);
    }
    // event.preventDefault(); 
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });

  };

  useEffect(() => {
    // Scroll to the end of the page when T is updated
    if (T) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [T]);

  const [showTable, setShowTable] = useState(false);
  const handleShowTable = () => {
    setShowTable(true);
  
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 100); // Adjust the delay as needed
  };
  
  

  const handleHideTable = () => {
    setShowTable(false);
  };

  
    return (
     <div className="container">

<div className="form-group mt-2 my-1">
<label htmlFor="Amount" className="form-label">Capital</label>
<div className="input-group">
<span className='input-group-text bg-info text-dark cursor-pointer no-select hover-effect' onClick={handleDecrementCapital}>-</span>
<input type="number" className="form-control input-lg" value={Capital} onChange={handleCapitalChange} id="Amount" aria-describedby="emailHelp" 
style={{backgroundColor: mode === 'light' ? 'white' : 'black', color: mode === 'light' ? 'black' : 'white'}}/>
<span className='input-group-text bg-info text-dark cursor-pointer no-select hover-effect' onClick={handleIncrementCapital}>+</span>
</div>
</div>

<div className="form-group my-1">
  <label htmlFor="monthlyValue" className="form-label">Monthly Value</label>
  <div className="input-group">
    <span className='input-group-text bg-info text-dark cursor-pointer no-select hover-effect' onClick={handleSipDecrement}>-</span>
    <input type="number" className="form-control input-lg" value={Sip} onChange={handleSipChange} id="monthlyValue" aria-describedby="emailHelp" 
      style={{ backgroundColor: mode === 'light' ? 'white' : 'black', color: mode === 'light' ? 'black' : 'white'}}
    />
    <span className='input-group-text bg-info text-dark cursor-pointer no-select hover-effect' onClick={handleSipIncrement}>+</span>
  </div>
</div>

<div className="form-group my-1">
  <label htmlFor="investmentPeriod" className="form-label">Period (Years)</label>
  <div className="input-group">
    <span className='input-group-text bg-info text-dark cursor-pointer no-select hover-effect' onClick={handlePeriodDecrement}>-</span>
    <input type="number" className="form-control input-lg" value={Period} onChange={handlePeriodChange} id="investmentPeriod" aria-describedby="emailHelp" 
      style={{ backgroundColor: mode === 'light' ? 'white' : 'black', color: mode === 'light' ? 'black' : 'white'}}
    />
    <span className='input-group-text bg-info text-dark cursor-pointer no-select hover-effect' onClick={handlePeriodIncrement}>+</span>
  </div>
</div>


<div className="form-group my-1">
<label htmlFor="Rate" className="form-label">Rate (%)</label>
<div className="input-group">
<span className='input-group-text bg-info text-dark cursor-pointer no-select hover-effect' onClick={handleRateDecrement}>-</span>
<input type="number" className="form-control input-lg" value={Rate} onChange={handleRateChange} id="Rate" 
style={{ backgroundColor: mode === 'light' ? 'white' : 'black', color: mode === 'light' ? 'black' : 'white'}}/>
<span className='input-group-text bg-info text-dark cursor-pointer no-select hover-effect'onClick={handleRateIncrement}>+</span>
</div>
</div>

      <label htmlFor="compounding" className="form-label">Select Compounding</label>
      <select className="form-control" name="features" style={{ backgroundColor: mode === 'light' ? 'white' : 'black', color: mode === 'light' ? 'black' : 'white' }} value={Compounding} onChange={handleCompoundingChange} id="compounding">
        <option value="Yearly">Yearly</option>
        <option value="Semiannually">Semiannually</option>
        <option value="Quarterly">Quarterly</option>
        <option value="Monthly">Monthly</option>
        <option value="Weekly">Weekly</option>
        <option value="Daily">Daily</option>
      </select>

<div className="text-center mt-3 mb-3">
<button type="submit" className="btn btn-success text-center" id="submit" onClick={answer}>Submit</button>
</div>

{T && (
        <div className={`jumbotron mt-3 rounded-3 custom-bg-${mode}`}>
          <div className="p-2 mb-2 container text-center">
            <h1 className="display-5 fw-bold" id="T">
              Total Amount = {T}
            </h1>
            <button type="submit" className="btn btn-warning text-center mx-2 mb-2" id="showtable" onClick={handleShowTable}>
              Show table
            </button>
            <button type="button" className="btn btn-info text-center mx-2 mb-2" id="hidetable" onClick={handleHideTable}>
              Hide table
            </button>
          </div>
        </div>
      )}
      {T && (
        <div className='mt-2 mb-2 text-center'>
          <ChartComponent mode={mode} chartData={{ labels: S, datasets: [{ data: A }] }} />
        </div>
      )}

<div>
        {showTable && (
          <div id="items" className="text-center mb-3">
            <table className={`table table-sm custom-table ${mode === 'light' ? 'light-mode' : 'dark-mode'}`}>
              <thead>
                <tr>
                  <th scope="col">Period</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Total Amount</th>
                </tr>
              </thead>
              <tbody className='table-body'>
                {S.map((item, index) => (
                  <tr key={index}>
                    <td>{item}</td>
                    <td>{I[index]}</td>
                    <td>{A[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="submit" className={`btn btn-${mode=='light'?'dark':'light'} text-center`} id="submit" onClick={handleScrollToTop}>Go to Top</button>
          </div>
        )}
      </div>
    </div>


 )
}
export default Homepage;

