import '../style/App.scss';
import '../index.css';
import {useEffect, useRef, useState} from "react";

function App() {

    const scrollSection0 = useRef();
    const scrollSection1 = useRef();
    const scrollSection2 = useRef();
    const scrollSection3 = useRef();

    const [yOffset, setYOffset] = useState(0); //window.pageYOffset 대신 쓸 변수
    // const [prevScrollHeight, setPrevScrollHeight] = useState(0); //현재 스크롤 위치(yOffset)보다 이전에 위차한 스크롤 섹션들의 스크롤 높이값의 합
    let prevScrollHeight = 0;
    let totalScrollHeight = 0;

    const [currentScene, setCurrentScene] = useState(0);// 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

    const [sceneInfo, setSceneInfo] = useState([
        {
            // 0
            type: 'sticky',
            heightNum: 5,//브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: scrollSection0
            }
        },
        {
            // 1
            type: 'normal',
            heightNum: 5,//브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: scrollSection1
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5,//브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: scrollSection2
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5,//브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: scrollSection3
            }
        }
    ]);

    const [activeSceneId,setActiveSceneId] = useState('');

    const setLayout = () => { //각 스크롤 섹션의 높이 세팅
        let temp = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            const copiedSceneInfo = sceneInfo;
            copiedSceneInfo[i].scrollHeight = copiedSceneInfo[i].heightNum * window.innerHeight;
            setSceneInfo(copiedSceneInfo);
            if (sceneInfo[i].objs.container !== null) {
                sceneInfo[i].objs.container.current.style.height = `${sceneInfo[i].scrollHeight}px`;
            }
        }

        totalScrollHeight = 0;
        for(let i=0; i<sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= window.pageYOffset) {
                setCurrentScene(i);
                temp = i;
                break;
            }
        }
        setActiveSceneId(`show-scene-${temp}`);
    }

    const scrollLoop = () => {
        prevScrollHeight = 0;

        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            if (currentScene === 3) {
                return;
            }
            setCurrentScene(currentScene + 1);
            setActiveSceneId(`show-scene-${currentScene}`);
        }
        if (yOffset < prevScrollHeight) {
            if (currentScene === 0) {
                return;
            }
            setCurrentScene(currentScene - 1);
            setActiveSceneId(`show-scene-${currentScene}`);
        }

    }

    useEffect(() => {
        setLayout();
    }, [yOffset])

    useEffect(() => {
        window.addEventListener('load',setLayout);
        window.addEventListener('resize',setLayout);
        window.addEventListener('scroll', () => {
            setYOffset(window.pageYOffset);
        });

        scrollLoop();
    }, [yOffset])


    return (
        <div id="Home">
            <div className="container" id={activeSceneId}>
                <nav className="global-nav">
                    <div className="global-nav-links">
                        <a href="#" className="global-nav-item">Rooms</a>
                        <a href="#" className="global-nav-item">Ideas</a>
                        <a href="#" className="global-nav-item">Stores</a>
                        <a href="#" className="global-nav-item">Contact</a>
                    </div>
                </nav>
                <nav className="local-nav">
                    <div className="local-nav-links">
                        <a href="#" className="product-name">AirMug Pro</a>
                        <a href="#" className="">개요</a>
                        <a href="#" className="">제품사양</a>
                        <a href="#" className="">구입하기</a>
                    </div>
                </nav>
                <section className="scroll-section" id="scroll-section-0" ref={scrollSection0}>
                    <h1>AirMug Pro</h1>
                    <div className="sticky-elem main-message">
                        <p>온전히 빠져들게 하는<br/>최고급 세라믹</p>
                    </div>
                    <div className="sticky-elem main-message">
                        <p>주변 맛을 느끼게 해주는<br/>주변 맛 허용 모드</p>
                    </div>
                    <div className="sticky-elem main-message">
                        <p>온종일 편안한<br/>맞춤형 손잡이</p>
                    </div>
                    <div className="sticky-elem main-message">
                        <p>새롭게 입가를<br/>찾아온 매혹</p>
                    </div>
                </section>
                <section className="scroll-section" id="scroll-section-1" ref={scrollSection1}>
                    <p className="description">
                        <strong>보통 스크롤 영역</strong>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad amet architecto culpa dicta,
                        doloremque ea esse est facere illum ipsa ipsum magni minima, minus necessitatibus nihil nobis
                        officia optio perspiciatis quibusdam ratione ut voluptatum. Alias commodi et minima nemo
                        praesentium sed sunt ullam? Consectetur cumque exercitationem ipsa iusto magni, nam natus
                        nesciunt nihil quia sed sunt totam vero voluptas! A architecto ducimus earum eligendi esse
                        fugiat fugit maiores perferendis, perspiciatis recusandae? Assumenda eligendi eveniet hic id
                        itaque, iure maiores natus nesciunt, nisi non perferendis quisquam quos! Asperiores at
                        consequuntur ipsa iste minima modi odio quibusdam reiciendis, ut velit! Consequuntur dolorem
                        doloribus ducimus eum inventore odit officiis quibusdam veniam. Aut dolores doloribus eaque eum
                        ipsam, ipsum molestias necessitatibus, provident quae rerum sapiente, tempora voluptate. Eaque
                        impedit maiores necessitatibus nulla quae quibusdam vel voluptates voluptatibus! Beatae dicta
                        dignissimos, dolores eveniet iure maiores similique. Architecto atque delectus, deleniti dolor
                        doloremque eius eligendi esse eum exercitationem fugiat illum impedit in incidunt ipsa laborum
                        mollitia, nisi non obcaecati quam quasi, quis quod quos repellendus sit tempora tenetur ullam
                        voluptates. Corporis deleniti, est eveniet fugit id ipsum libero porro reprehenderit voluptate
                        voluptatem. Commodi, ducimus illo ipsam laudantium modi, natus optio porro repellat repellendus
                        sunt vero?
                    </p>
                </section>
                <section className="scroll-section" id="scroll-section-2" ref={scrollSection2}>
                    <div className="sticky-elem main-message">
                        <p>
                            <small>편안한 촉감</small>
                            입과 하나 되다
                        </p>
                    </div>
                    <div className="sticky-elem desc-message">
                        <p>
                            편안한 목넘김을 완성하는 디테일한 여러 구성 요소들, 우리는 이를 하나하나 새롭게 살피고 재구성하는 과정을 거쳐 새로운 수준의 머그, AirMug Pro를
                            만들었습니다. 입에 뭔가 댔다는 감각은 어느새 사라지고 오롯이 당신과 음료만 남게 되죠.
                        </p>
                        <div className="pin"></div>
                    </div>
                    <div className="sticky-elem desc-message">
                        <p>
                            디자인 앤 퀄리티 오브 스웨덴,<br/>메이드 인 차이나
                        </p>
                        <div className="pin"></div>
                    </div>
                </section>
                <section className="scroll-section" id="scroll-section-3" ref={scrollSection3}>
                    <p className="mid-message">
                        <strong>Retina 머그</strong><br/>
                        아이디어를 광활하게 펼칠<br/>
                        아름답고 부드러운 음료 공간.
                    </p>
                    <p className="canvas-caption">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet at fuga quae perspiciatis
                        veniam impedit et, ratione est optio porro. Incidunt aperiam nemo voluptas odit quisquam harum
                        in mollitia. Incidunt minima iusto in corporis, dolores velit. Autem, sit dolorum inventore a
                        rerum distinctio vero illo magni possimus temporibus dolores neque adipisci, repudiandae
                        repellat. Ducimus accusamus similique quas earum laborum. Autem tempora repellendus asperiores
                        illum ex! Velit ea corporis odit? Ea, incidunt delectus. Sapiente rerum neque error deleniti
                        quis, et, quibusdam, est autem voluptate rem voluptas. Ratione soluta similique harum nihil vel.
                        Quas inventore perferendis iusto explicabo animi eos ratione obcaecati.
                    </p>
                </section>
                <footer className="footer">
                    2020, 1분 코딩
                </footer>
            </div>
        </div>
    );
}

export default App;
