import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="subContainerLeft">
          <div className="tagline">
            <h1>
              Manage your <span className="money">money</span> in the{' '}
              <span className="best">best</span> possible <span className="way">way.</span>
            </h1>
            <p>Expense.Tracker is the website that manages your finance with its ever smart features. </p>
          </div>
          <div className="getStarted">
            <button>
              Get Started <img src="./Images_Used/Icons/right.png" alt="" />
            </button>
            <button>
              <img src="./Images_Used/Icons/pg1_play_video.svg" alt="" />
              Watch Video
            </button>
          </div>
          {/* <div className="download">
            <button><img src="./Images_Used/Icons/apple.svg" alt="" />Download on the <span>App Store</span></button>
            <button><img src="./Images_Used/Icons/google-play-icon.svg" alt="" />Get it on <span>Google Play</span></button>
          </div> */}
        </div>
        <div className="subContainerRight">
          <img src="./Images_Used/page_1.jpg" alt="" />
          <p>
            Ea<span className="hideWord">sy</span> Tran<span className="hideWord">sac</span>tion
          </p>
        </div>
      </div>
      <div className="container2">
        <div className="trust">
          <div className="trustLine">Trusted by more than <span className="ninety">90,000</span> Companies</div>
          <div className="trustLogo">
            <div>
              <img src="./Images_Used/Icons/pg1_users.svg" alt="" />
              <p>
                120M <br /> Customer
              </p>
            </div>
            <div>
              <img src="./Images_Used/Icons/pg1_download.svg" alt="" />
              <p>
                40M <br /> Total Download
              </p>
            </div>
            <div>
              <img src="./Images_Used/Icons/pg1_ranking.svg" alt="" />
              <p>
                10M <br /> Five Star Review
              </p>
            </div>
          </div>
        </div>
        <div className="different">
          <div className="different1">
            <h2>What makes us different?</h2>
            <p>Our niche is to build unique website that are made with surprisingly cool and workable features.</p>
          </div>
          <div className="different2">
            <div className="differnetLogo">
              <img src="./Images_Used/Icons/pg2_cpu_charge.svg" alt="" />
              <h5>Multiple Method</h5>
              <p>Using this website is pretty easy, as we have developed this with workable yet easy to use features.</p>
              <a href="">Read More</a>
            </div>
            <div className="differnetLogo">
              <img src="./Images_Used/Icons/pg2_cpu_charge.svg" alt="" />
              <h5>Newest Technology</h5>
              <p>Designed and developed with latest software and robust technologies.</p>
              <a href="">Read More</a>
            </div>
            <div className="differnetLogo">
              <img src="./Images_Used/Icons/pg2_cpu_charge.svg" alt="" />
              <h5>Security First</h5>
              <p>Designed with latest technology, this ensures robust safety, security, and privacy of your data.</p>
              <a href="">Read More</a>
            </div>
            <div className="differnetLogo">
              <img src="./Images_Used/Icons/pg2_cpu_charge.svg" alt="" />
              <h5>User Friendly</h5>
              <p>Its user-friendly features and design are the reason behind the increasing number of Expense.Tracket website's users.</p>
              <a href="">Read More</a>
            </div>
          </div>
        </div>
      </div>
      <div className="container3">
        <div className="part1">
          <div className="part1Image">
            <img src="./Images_Used/Icons/pg3_1.png" alt="" />
          </div>
          <div className="part1Lines">
            <h3>
              Wonderful & Effortless way to view your <span className="ninety">Transaction</span>
            </h3>
            <p>Simplifying your life by helping you with easy-to-use app that takes care of your finance in  abetter way.</p>
            <button>
              Read More <img src="./Images_Used/Icons/right.png" alt="" />
            </button>
          </div>
        </div>
        <div className="part1 part2">
          <div className="part1Image">
            <img src="./Images_Used/Icons/pg3_2.png" alt="" />
          </div>
          <div className="part1Lines">
            <h3>
              Simple way to manage your money and add <span className="ninety">Expense</span>
            </h3>
            <p>Not only does help you do transactions, but you can also use it to pay your electricity bills, food bills, and many more things.</p>
            <button>
              Read More <img src="./Images_Used/Icons/right.png" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="container4">
        <div className="reason">
          <h3>Key resons to choose us over others</h3>
          <p>Here are the reasons that will compel you to give Expense.Tracker your mobile space and use it to on frequent basis!</p>
        </div>
        <div className="cards">
          <div className="card" id="card1">
            <img src="./Images_Used/Icons/fast_payment.png" alt="" />
            <h4>Fast Payment</h4>
            <p>Payment could be that easier ? Well, if you have got Expense.Tracker installed on phone then absolutely.</p>
            <a href="">Read More</a>
          </div>
          <div className="card">
            <img src="./Images_Used/Icons/fav_dicount.png" alt="" />
            <h4>Favourable Discounts</h4>
            <p>Getting rewards is something that we always expect from finance apps. Wait using Expense.Tracker, you can get your favourable deals and discounts.</p>
            <a href="">Read More</a>
          </div>
          <div className="card">
            <img src="./Images_Used/Icons/AIO.png" alt="" />
            <h4>All In One Finances</h4>
            <p>Now you can add handle everything right from your basic transactions to every type of bill payements with a single app that offers multiple benefits</p>
            <a href="">Read More</a>
          </div>
        </div>
      </div>
      <div className="container5">
        <div className="con5img">
          <img src="./Images_Used/Icons/pg5.png" alt="" />
        </div>
        <div className="con5text">
          <h2>
            Keep a track of your transaction <span className="ninety">easily</span> with Expense.Tracker
          </h2>
          <p>With Expense.Tracker you will be getting details of your weekly transactions in a deatiled manner so that you can keep a record of your money spent.</p>
          <button>
            Read More <img src="./Images_Used/Icons/right.png" alt="" />
          </button>
        </div>
      </div>
      <div className="container6">
        <div className="say">
          <h2>What our users say ?</h2>
          <p>Hear the words of appredciation from ur users!</p>
        </div>
        <div className="user">
          <img src="./Images_Used/user1.png" alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus excepturi reprehenderit, maiores omnis,
            delectus cupiditate dolorum nesciunt commodi repellat velit, itaque molestias eligendi labore dicta ut
            distinctio earum dolores impedit?
          </p>
          <h5>Carlunce Michhel</h5>
          <p>Happy User</p>
        </div>
        <div className="qoutes">
          <img src="./Images_Used/Icons/quote_open.svg" alt="" />
          <img src="./Images_Used/Icons/quote_close.svg" alt="" />
        </div>
        <div className="userImg">
          <img src="./Images_Used/user2.png" alt="" />
          <img src="./Images_Used/user3.png" alt="" />
          <img src="./Images_Used/user4.png" alt="" />
          <img src="./Images_Used/user5.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;