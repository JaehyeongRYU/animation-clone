import '../style/App.scss';
import '../index.css';
import {useEffect, useRef, useState} from "react";

function App() {

    const scrollSection0 = useRef();
    const scrollSection1 = useRef();
    const scrollSection2 = useRef();
    const scrollSection3 = useRef();

    const message0A = useRef();
    const message0B = useRef();
    const message0C = useRef();
    const message0D = useRef();

    const content1 = useRef();

    const message2A = useRef();
    const message2B = useRef();
    const message2C = useRef();
    const pin2B = useRef();
    const pin2C = useRef();

    const canvasCaption3 = useRef();

    const [yOffset, setYOffset] = useState(0); //window.pageYOffset 대신 쓸 변수
    // const [prevScrollHeight, setPrevScrollHeight] = useState(0); //현재 스크롤 위치(yOffset)보다 이전에 위차한 스크롤 섹션들의 스크롤 높이값의 합
    let prevScrollHeight = 0;
    let totalScrollHeight = 0;
    let enterNewScene = false; //새로운 scene이 시작된 순간 true

    const [currentScene, setCurrentScene] = useState(0);// 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

    const [sceneInfo, setSceneInfo] = useState([
        {
            // 0
            type: 'sticky',
            heightNum: 5,//브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: scrollSection0,
                messageA: message0A,
                messageB: message0B,
                messageC: message0C,
                messageD: message0D,
            },
            values: {//scroll에 따른 비율 조정
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            }
        },
        {
            // 1
            type: 'normal',
            heightNum: 5,//브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: scrollSection1,
                content : content1
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5,//브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: scrollSection2,
                messageA: message2A,
                messageB: message2B,
                messageC: message2C,
                pinB: pin2B,
                pinC: pin2C,
            },
            values: {
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
                messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
                messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
                messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
                messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
                messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
                messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
                messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
                messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
                pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
                pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
                pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
                pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5,//브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: scrollSection3,
                canvasCaption: canvasCaption3,
            },
            values: {

            }
        }
    ]);

    const [activeSceneId, setActiveSceneId] = useState('');

    const setLayout = () => { //각 스크롤 섹션의 높이 세팅
        let temp = 0;//currentScene 임시 할당 변수
        for (let i = 0; i < sceneInfo.length; i++) {
            const copiedSceneInfo = sceneInfo;

            if(sceneInfo[i].type === 'sticky'){
                copiedSceneInfo[i].scrollHeight = copiedSceneInfo[i].heightNum * window.innerHeight;
                setSceneInfo(copiedSceneInfo);
            }
            else if(sceneInfo[i].type === 'normal') {
                copiedSceneInfo[i].scrollHeight = 1800;
                setSceneInfo(copiedSceneInfo);
                console.log(sceneInfo[i].objs.container.current.style.height);

            }
            if (sceneInfo[i].objs.container !== null) {
                sceneInfo[i].objs.container.current.style.height = `${sceneInfo[i].scrollHeight}px`;
            }
        }

        totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= window.pageYOffset) {
                setCurrentScene(i);
                temp = i;
                break;
            }
        }
        setActiveSceneId(`show-scene-${temp}`);
    }

    const calcValues = (values, currentYOffset) => {
        let rv; //return value
        // 현재 씬(스크롤 섹션)에서 스크롤 된 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if (values.length === 3) {
            // start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            }
            else if(currentYOffset < partScrollStart) {
                rv = values[0];
            }
            else if(currentYOffset > partScrollEnd) {
                rv = values[1];
            }
        }
        else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return rv;
    }

    const playAnimation = () => {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight; //  yOffset / 현재 scene의 scrollHeight

        switch (currentScene) {
            case 0:
                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.current.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.current.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.current.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.current.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageB.current.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.current.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.current.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.current.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageC.current.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.current.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.current.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.current.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageD.current.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.current.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.current.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.current.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }
                break;
            case 2:
                if (scrollRatio <= 0.25) {
                    // in
                    objs.messageA.current.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.current.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.current.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.current.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.57) {
                    // in
                    objs.messageB.current.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageB.current.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.pinB.current.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageB.current.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageB.current.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.pinB.current.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }

                if (scrollRatio <= 0.83) {
                    // in
                    objs.messageC.current.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageC.current.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.pinC.current.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageC.current.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageC.current.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.pinC.current.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
                break;
            case 3:
                break;
        }
    }

    const scrollLoop = () => {
        prevScrollHeight = 0;
        enterNewScene = false;

        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            if (currentScene === 3) {
                return;
            }
            enterNewScene = true;
            setCurrentScene(currentScene + 1);
            setActiveSceneId(`show-scene-${currentScene}`);
        }
        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) {
                return;
            }
            setCurrentScene(currentScene - 1);
            setActiveSceneId(`show-scene-${currentScene}`);
        }
        if(enterNewScene) {
            return;
        }
        playAnimation();

    }

    useEffect(() => {
        setLayout();
    }, [yOffset])

    useEffect(() => {
        window.addEventListener('load', setLayout);
        window.addEventListener('resize', setLayout);
        window.addEventListener('scroll', () => {
            setYOffset(window.pageYOffset);
        });
        scrollLoop();
    }, [yOffset])

    console.log("currentScene : ",currentScene);

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
                    <div className="sticky-elem main-message a" ref={message0A}>
                        <p>온전히 빠져들게 하는<br/>최고급 세라믹</p>
                    </div>
                    <div className="sticky-elem main-message b" ref={message0B}>
                        <p>주변 맛을 느끼게 해주는<br/>주변 맛 허용 모드</p>
                    </div>
                    <div className="sticky-elem main-message c" ref={message0C}>
                        <p>온종일 편안한<br/>맞춤형 손잡이</p>
                    </div>
                    <div className="sticky-elem main-message d" ref={message0D}>
                        <p>새롭게 입가를<br/>찾아온 매혹</p>
                    </div>
                </section>
                <section className="scroll-section" id="scroll-section-1" ref={scrollSection1}>
                    <p className="description" ref={content1}>
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
                    <div className="sticky-elem main-message a" ref={message2A}>
                        <p>
                            <small>편안한 촉감</small>
                            입과 하나 되다
                        </p>
                    </div>
                    <div className="sticky-elem desc-message b" ref={message2B}>
                        <p>
                            편안한 목넘김을 완성하는 디테일한 여러 구성 요소들, 우리는 이를 하나하나 새롭게 살피고 재구성하는 과정을 거쳐 새로운 수준의 머그, AirMug Pro를
                            만들었습니다. 입에 뭔가 댔다는 감각은 어느새 사라지고 오롯이 당신과 음료만 남게 되죠.
                        </p>
                        <div className="pin" ref={pin2B}></div>
                    </div>
                    <div className="sticky-elem desc-message c" ref={message2C}>
                        <p>
                            디자인 앤 퀄리티 오브 스웨덴,<br/>메이드 인 차이나
                        </p>
                        <div className="pin" ref={pin2C}></div>
                    </div>
                </section>
                <section className="scroll-section" id="scroll-section-3" ref={scrollSection3}>
                    <p className="mid-message">
                        <strong>Retina 머그</strong><br/>
                        아이디어를 광활하게 펼칠<br/>
                        아름답고 부드러운 음료 공간.
                    </p>
                    <p className="canvas-caption" ref={canvasCaption3}>
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
