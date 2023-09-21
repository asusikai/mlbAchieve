"use client";
import sample from "../../assets/player/sample_profile_img.jpg";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import "../../styles/SearchPlayerPageStyle.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayerLetterData } from "@/app/redux/features/searchPlayerSlice";
import { useRouter } from "next/navigation";
import playerFace from "@/app/players/[...id]/current.png";

type PlayerType = {
  id: number;
  name: string;
  number: number;
  team: string;
  profile_img: StaticImageData;
  teamCode: string;
};
const AllPlayers = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchLetter = useSelector(
    (state: any) => state.searchPlayer.firstLetterList
  );
  const [nowPage, setNowPage] = useState(0);
  const articlePerPage = 30;
  const [isActive, setIsActive] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const alphabets = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  // const [players, setPlayers] = useState([
  //   {'id': 1, 'profile_img': sample, 'lastName': 'Park', 'firstName': 'Chanho','number': 61, 'team': 'LosAngelesDodgers', 'teamCode': 'LAD'},
  //   {'id': 2, 'profile_img': sample, 'lastName': 'Park', 'firstName': 'Chanho', 'number': 61, 'team': 'LosAngelesDodgers', 'teamCode': 'LAD'},
  // ])
  const backgroundCheck = (idx: number) => {
    const updatedIsActive = isActive.map((_, index) => index === idx);
    setIsActive(updatedIsActive);
    const selectedAlphabet = alphabets[idx];
    const action = {
      searchData: selectedAlphabet,
      nowPage: nowPage,
      articlePerPage: articlePerPage,
    };
    dispatch(fetchPlayerLetterData(action));
  };

  const handleDetailPage = (id: string) => {
    router.push(`players/${id}`);
  };

  // const [style, setStyle] = useState({});
  // const [isActive, setIsActive] = useState(false);

  // const handleMouseMove = (e) => {
  //   e.preventDefault();
  //   const { offsetX, offsetY, type, touches } = e;
  //   const pos =
  //     type === "touchmove"
  //       ? [touches[0].clientX, touches[0].clientY]
  //       : [offsetX, offsetY];
  //   const [l, t] = pos;
  //   const h = e.target.clientHeight;
  //   const w = e.target.clientWidth;
  //   const px = Math.abs(Math.floor((100 / w) * l) - 100);
  //   const py = Math.abs(Math.floor((100 / h) * t) - 100);
  //   const pa = 50 - px + (50 - py);
  //   const lp = 50 + (px - 50) / 1.5;
  //   const tp = 50 + (py - 50) / 1.5;
  //   const px_spark = 50 + (px - 50) / 7;
  //   const py_spark = 50 + (py - 50) / 7;
  //   const p_opc = 20 + Math.abs(pa) * 1.5;
  //   const ty = ((tp - 50) / 2) * -1;
  //   const tx = ((lp - 50) / 1.5) * 0.5;

  //   const grad_pos = `background-position: ${lp}% ${tp}%;`;
  //   const sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
  //   const opc = `opacity: ${p_opc / 100};`;
  //   const tf = `rotateX(${ty}deg) rotateY(${tx}deg)`;

  //   const cardStyle = {
  //     transform: `perspective(1000px) ${tf}`,
  //   };

  //   setStyle({ grad_pos, sprk_pos, opc, cardStyle });
  //   setIsActive(true);

  //   if (type === "touchmove") {
  //     return false;
  //   }

  //   clearTimeout(x);
  // };

  // const handleMouseOut = () => {
  //   setStyle({});
  //   setIsActive(false);
  //   x = setTimeout(function () {
  //     setIsActive(true);
  //   }, 2500);
  // };
  const [activeCard, setActiveCard] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState(null);

  const handleMouseMove = (e, cardIndex) => {
    const l = e.nativeEvent.offsetX;
    const t = e.nativeEvent.offsetY;
    const h = e.currentTarget.clientHeight;
    const w = e.currentTarget.clientWidth;
    const lp = Math.abs(Math.floor((100 / w) * l) - 100);
    const tp = Math.abs(Math.floor((100 / h) * t) - 100);
    const bg = `background-position: ${lp}% ${tp}%;`;
    const style = `.card.active:before { ${bg} }`;

    setActiveCard(cardIndex);
    setBackgroundStyle(style);
  };

  const handleMouseOut = () => {
    setActiveCard(null);
    setBackgroundStyle(null);
  };

  const cards = ["charizard", "mewtwo", "dragonite"]; // Add more card names if needed

  return (
    <>
      {/* <div className="playerCard">
        <div className="container">
          <Image src={playerFace} alt="" className="playerFace" />
          <div className="circle">1</div>
          <div className="circle2">2</div>
          <div className="circle3">3</div>
          <div className="rectangle">어쩌구</div>
          <div className="rectangle2">선수이름</div>
        </div>
      </div> */}

      <div className="searchAlphabet">
        {alphabets.map((alphabet, index) => (
          <div
            key={index}
            className={`alphabet ${isActive[index] ? "clicked_alphabet" : ""}`}
            onClick={() => backgroundCheck(index)}
          >
            {alphabet}
          </div>
        ))}
      </div>
      <div>
        {searchLetter ? (
          searchLetter.map((player: any) => (
            <div
              key={player.id}
              className="playerContent"
              onClick={() => handleDetailPage(player.id)}
            >
              <Image src={player.img} alt={player.name} className="profile" />
              <div>
                <p>{player.name}</p>
                <p>
                  {player.team} {player.number}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>알파벳을 선택해 주세요.</div>
        )}
      </div>
      <div className="cardzone">
        <main id="app">
          <div className="card charizard">
            <div className="playerCard">
              <div className="container">
                <Image src={playerFace} alt="" className="playerFace" />
                <div className="circle">1</div>
                <div className="circle2">2</div>
                <div className="circle3">3</div>
                <div className="rectangle">어쩌구</div>
                <div className="rectangle2">선수이름</div>
              </div>
            </div>
          </div>
        </main>
        <main id="app">
          <div className="card charizard">
            <div className="playerCard">
              <div className="container">
                <Image src={playerFace} alt="" className="playerFace" />
                <div className="circle">1</div>
                <div className="circle2">2</div>
                <div className="circle3">3</div>
                <div className="rectangle">어쩌구</div>
                <div className="rectangle2">선수이름</div>
              </div>
            </div>
          </div>
        </main>
        <main id="app">
          <div className="card charizard">
            <div className="playerCard">
              <div className="container">
                <Image src={playerFace} alt="" className="playerFace" />
                <div className="circle">1</div>
                <div className="circle2">2</div>
                <div className="circle3">3</div>
                <div className="rectangle">어쩌구</div>
                <div className="rectangle2">선수이름</div>
              </div>
            </div>
          </div>
        </main>
        <main id="app">
          <div className="card charizard">
            <div className="playerCard">
              <div className="container">
                <Image src={playerFace} alt="" className="playerFace" />
                <div className="circle">1</div>
                <div className="circle2">2</div>
                <div className="circle3">3</div>
                <div className="rectangle">어쩌구</div>
                <div className="rectangle2">선수이름</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AllPlayers;
