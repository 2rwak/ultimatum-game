import 'react-toastify/dist/ReactToastify.css';
import './Ultimatum.css';

import React, {
  useEffect,
  useState,
} from 'react';

import { Container } from 'react-bootstrap';
import { TbClick } from 'react-icons/tb';
import Fade from 'react-reveal';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
import Swal from 'sweetalert2';

function Ultimatum() {
  const [scenarios, setScenarios] = useState([]);
  const [cash, setCash] = useState(0);
  const [count, setCount] = useState(-1);
  const [Start, setStart] = useState(false);
  const [accept, setAccept] = useState(0);
  const [reject, setReject] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ["rgba(255, 255, 255, 0.75)", "rgb(200,200,219, 0.75)"];
  console.log(count);
  console.log(scenarios);
  console.log(totalAmount);


  function handleButtonClicksuccess(totalAmount) {
  const message = `لقد ربحت ${totalAmount} ريال`;
  toast.success(message,{
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function handleButtonClickfailure(totalAmount) {
  const message = `لقد خسرت ${totalAmount} ريال`;
  toast.error(message,{
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function generateProposal(fairness) {
    const minAmount = 10; // minimum offer amount
    const maxAmount = 100; // maximum offer amount
    const fairnessRange = (maxAmount - minAmount) * (fairness / 10); // range of offer amounts based on fairness
    const offerAmount = minAmount + Math.floor(Math.random() * fairnessRange); // generate random offer amount within range
    const splitPercentage =offerAmount; // percentage of offer amount that the proposer will receive if the offer is accepted
    const splitAmount = Math.floor(offerAmount * splitPercentage); // calculate split amount
    const totalAmount = splitAmount - offerAmount;

    const description = (
        <div class="message-container">
          <Fade left>
            {/* <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_KaGQcx3h4i.json"  background="transparent"  speed="1"  style={{ width: '100%', height: '250px' }}  loop  autoplay></lottie-player> */}
            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_LkON0pK1XM.json"  background="transparent"  speed="0.4"  style={{ width: '100%', height: '250px' }}  loop  autoplay></lottie-player>
          </Fade>
          <div class="message">
            <div class="offer-amount margintopbottom">
                <span class="label">المبلغ المعروض</span>
                <span class="value">{offerAmount}</span>
                <span class="label">ريال</span>
            </div>
            <div class="total-amount margintopbottom">
              <span class="label">ستحصل على</span>
              <span class="value">{totalAmount}</span>
              <span class="label">ريال</span>
            </div>
            <div class="split-amount margintopbottom">
              <span class="label">سيحصل الشخص الآخر على</span>
              <span class="value">{splitAmount}</span>
              <span class="label">ريال</span>
            </div>
          </div>
        </div>
    );

    return { offerAmount, splitAmount, description, totalAmount };
  }

  function generateScenarios(numScenarios) {
    const newScenarios = [];

    for (let i = 0; i < numScenarios; i++) {
      const fairness = Math.floor(Math.random() * 11); // generate random fairness between 0 and 10
      const proposal = generateProposal(fairness); // generate proposal based on fairness
      const id = i + 1; // generate unique identifier

      newScenarios.push({ id, fairness, ...proposal }); // add scenario to array
    }

    setScenarios(newScenarios); // update state with new scenarios
  }

  function getScenario() {
    console.log(scenarios[count]);//print current object
    const currentScenario = scenarios[count];
    const TotalAmount = currentScenario ? currentScenario.totalAmount : 0;
    return scenarios[count]?.description;
  }

  function handleStartClick() {
    setStart(true);
    setCount(0);
    setTotalAmount(0)
  }

  function handleClick(action ,nextvalue) {
    if (action === 1) {
      setStart(true);
      setCash((prevCash) => prevCash + scenarios[count]?.totalAmount);
      setTotalAmount()
      setAccept((prevAccept) => prevAccept + 1);
      console.log("accept",accept);
      handleButtonClicksuccess(scenarios[count]?.totalAmount,)
    }else{
        setReject((prevReject) => prevReject + 1);
        console.log("reject",reject)
        handleButtonClickfailure(scenarios[count]?.totalAmount)
        console.log(nextvalue)
    }
    setCount((prevCount) => prevCount + 1);
  }

  

  function done_alert() {
    Swal.fire({
      title: "!ممتاز ",
      text: "أنهيت الاختبار بنجاح",
      icon: "success",
      confirmButtonColor: "#32437c",
      confirmButtonText: "حسنا",
      width: "400px",
    }).then(() => {
      // Reload the page to restart the game
      window.location.reload();
    });
  }
  // Check the count value after every update
  useEffect(() => {
    if (count === 10) {
      done_alert();
    }
  }, [count]);

  useEffect(() => {
    if (count === 0) {
      generateScenarios(10);
      setCash(0);
    }
  }, [count]);

useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex === 0 ? 1 : 0)); // Toggle between 0 and 1
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return Start === false ? (
    <Container fluid className="first-container">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="alert-body">
        <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_NaBiczarjA.json"  background="transparent"  speed="1"  style={{ width: '380px', height: '150px' }}  loop  autoplay></lottie-player>
        <div className="alert-message">
          {/* TODO: اكتب وصف */}
          <Fade right>
            <h1 className="description">
              في هذه اللعبة، عدد من العروض ستقدم لك. خلال كل عرض، سيتلقى شخص آخر
              نسبة من المبلغ{" "}
            </h1>
          </Fade>
          <Fade right>
            <h1 className="description">
              نسبة المبلغ المعروض تختلف من كل عرض لاخر
            </h1>
          </Fade>
          <Fade right>
            <h1 className="description">
              يمكنك اختيار
              <span className="positive"> قبول </span>
              أو <span className="negative"> رفض </span> العرض
            </h1>
          </Fade>
          <Fade right>
            <h1 className="description">
              عند
              <span className="positive"> قبول </span>
              العرض سيضاف المبلغ المعروض الى حسابك، عند{" "}
              <span className="negative"> الرفض </span> كلاكما لن يحصل على المبلغ
            </h1>
          </Fade>
          <Fade right>
            <h1 className="description">
              عليك اختيار العروض الاكثر عدلًا مع الابقاء في عين الاعتبار أن هدفك
              هو زيادة الربح
            </h1>
          </Fade>
          <Fade right>
            <h1 className="description-start">
              للبدأ اضغط ابدأ اللعب
              <TbClick size={30} color="black" />
            </h1>
          </Fade>
        </div>
      </div>
      {/* fourth section */}
      <div className="card-deck">
        <div className="card startbutton" onClick={() => handleStartClick()}>
          <Fade right>
            <h1 className="margin0">ابدأ اللعب</h1>
          </Fade>
        </div>
      </div>
    </Container>
  ) : (
    <Container fluid className="first-container">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      {/* First section */}
      <div className="progressbar">
        <div className="progressbar">
          <div className="progressbar__label">{Math.floor((count / 10) * 100)}%</div>
        <progress className="progressbar__fill" value={count} max={10} />
    </div>
      </div>
      <ToastContainer />
      {/* second section */}
      <Fade right>
        <div className="amount">
          <div className="icon-cash">
          <div className="cash"  style={{ backgroundColor: colors[colorIndex], transition: "background-color 1s ease-in-out" }}>
            <h1 className="cash-name">مجموع الربح الان</h1>
            <h1 className="cash-name">:</h1>
            <h1 className="cash-amount">
              {" "}
              {cash}{" "}
            </h1>
            <h1 className="cash-name"> ريال </h1>
            <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_it8yjgkh.json"  background="transparent"  speed="1"  style={{ width: '100px', height: '80px' }}  loop  autoplay></lottie-player>
            {/* <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_pk0smbuq.json"  background="transparent"  speed="1"  style={{ width: '100px', height: '80px' }}  loop  autoplay></lottie-player> */}
            </div>
          </div>
        </div>
      </Fade>

      {/* third section */}
      <div className="alert">
      <div className="hand-card reject" onClick={() => handleClick(0,scenarios[count+1])}>
        <Fade left key={count}>
          {/* <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_L5FmEqdLn6.json"  background="transparent"  speed="0.7"  style={{ width: '150px', height: '150px', margin:'auto' }}  loop autoplay></lottie-player> */}
          <lottie-player src="https://assets3.lottiefiles.com/private_files/lf30_djxonzns.json"  background="transparent"  speed="0.5"  style={{ width: '150px', height: '150px', margin:'auto' }}  loop autoplay ></lottie-player>
          <h1 className="marginbottom">رفض</h1>
        </Fade>
      </div>
        <div className="alert-body">
            <Fade up key={count}>
              <div className="alert-message">
                <h1 className="scenario">{getScenario()}</h1>
              </div>
            </Fade>
        </div>
        <div className="hand-card accept" onClick={() => handleClick(1,scenarios[count+1])}>
          <Fade right key={count}>
            {/* <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_Vs49OV.json"  background="transparent"  speed="0.7"  style={{ width: '150px', height: '150px',margin:'auto' }}  loop  autoplay></lottie-player> */}
            <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_kenw4cok.json"  background="transparent"  speed="0.3"   style={{ width: '150px', height: '150px',margin:'auto' }}   loop  autoplay></lottie-player>
            <h1 className="marginbottom">قبول</h1>
          </Fade>
        </div>
      </div>

    </Container>
  );
}
export default Ultimatum;
