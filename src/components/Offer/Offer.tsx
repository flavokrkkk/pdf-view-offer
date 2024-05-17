import { FC, useEffect, useRef, useState } from "react";
import "./styles.css";
import arrow from "../../static/arrow.png";
import pdf from "../../mockData/parsePdf.pdf";

const Offer: FC = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const parentIframeRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const scrollTop: number = Math.ceil(
      Number(parentIframeRef.current?.scrollTop)
    );
    const scrollHeight = parentIframeRef.current?.scrollHeight;
    const offsetHeight = parentIframeRef.current?.clientHeight;
    if (scrollHeight! - offsetHeight! === scrollTop) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    parentIframeRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      parentIframeRef.current?.removeEventListener(
        "scroll",
        () => handleScroll
      );
    };
  }, []);

  return (
    <div className="offer__wrapper">
      <h1 className="offer__title">
        <img className="offer__arrow" src={arrow} />
        Соглашение
      </h1>
      <div ref={parentIframeRef} className="offer__pdf-wrapper">
        <iframe
          src={pdf + "#view=Fit&toolbar=0&statusbar=0&messages=0&navpanes=0"}
          scrolling="no"
          className="frame"
        />
      </div>
      <div className="offer__checkbox">
        <label htmlFor="" className="offer__label">
          <input
            className="offer__input-checkbox"
            type="checkbox"
            disabled={isDisabled}
          />
          <p>
            Я Принимаю условия{" "}
            <span className="offer__span">
              Политики конфиденциальности и Пользовательского соглашения,
            </span>
            a также даю свое согласие на обработку персональных данных
          </p>
        </label>
      </div>

      <div className="offer__wrapper-button">
        <button>Продолжить</button>
      </div>
    </div>
  );
};

export default Offer;
