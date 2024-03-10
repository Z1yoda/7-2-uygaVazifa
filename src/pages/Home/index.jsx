import './index.css'
import carousel1 from '../../assets/carousel1.png'
import carousel2 from '../../assets/carousel2.png'
import carousel3 from '../../assets/carousel3.png'
import carousel4 from '../../assets/carousel4.png'
import lamp from '../../assets/lamp.png'
import table from '../../assets/table.png'
import bad from '../../assets/bad.png'

function Home() {
    return (
        <>
            <div className='main-wrapper'>
                <div className="main-left">
                    <h1>We are changing the way people shop</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.<br /> Tempore repellat explicabo enim soluta temporibus asperiores <br /> aut obcaecati perferendis porro nobis.</p>
                    <button>OUR PRODUCTS</button>
                </div>
                <div className="main-raight carousel">
                    <div className="carousel-item">
                        <img src={carousel1} alt="" />
                    </div>
                    <div className="carousel-item">
                        <img src={carousel2} alt="" />
                    </div>
                    <div className="carousel-item">
                        <img src={carousel3} alt="" />
                    </div>
                    <div className="carousel-item">
                        <img src={carousel4} alt="" />
                    </div>


                </div>
            </div>
            <div className="products-wrapper">
                <div className="featured"><h2>Featured Products </h2></div>
                <div className="card-wrapper">
                    <div className="card">
                        <img src={lamp} alt="" />
                        <div className="card-body">
                            <h2>Avant-Garde Lamp</h2>
                            <span>179.99$</span>
                        </div>
                    </div>
                    <div className="card">
                        <img src={table} alt="" />
                        <div className="card-body">
                            <h2>Avant-Garde Lamp</h2>
                            <span>179.99$</span>
                        </div>
                    </div>
                    <div className="card">
                        <img src={bad} alt="" />
                        <div className="card-body">
                            <h2>Avant-Garde Lamp</h2>
                            <span>179.99$</span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home