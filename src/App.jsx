import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }
  const BackgroundImage = "https://images.pexels.com/photos/6770775/pexels-photo-6770775.jpeg"
  return (
    <div className='flex'>
      <div className='w-1/2'>
        <img src="https://images.pexels.com/photos/7708806/pexels-photo-7708806.jpeg" alt="" className="w-full h-screen object-cover" />

        <div className="w-1/2 max-w-full p-5 absolute inset-0 flex flex-col justify-center items-center text-center backdrop-blur-sm bg-black/30">
          <h1 className="text-4xl text-white mb-5">Welcome to Currency Converter</h1>
          <p className="text-lg text-white">Currency Converter provides a seamless solution for all your currency conversion needs. With real-time exchange rates and user-friendly features, we make it easy to convert currencies accurately and efficiently. Whether you're traveling, shopping internationally, or managing finances, our platform ensures a hassle-free experience. Explore our intuitive interface, customize your preferences, and stay informed with the latest currency trends. Start converting currencies effortlessly with Currency Converter today.</p>
        </div>
      </div>
      <div
        className="w-1/2 h-screen flex flex-wrap justify-end items-center bg-cover bg-no-repeat "
        style={{
          backgroundImage: `url('${BackgroundImage}')`,
        }}
      >
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert()
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  onAmountChange={(amount) => { setAmount(amount) }}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-black hover:bg-gray-900 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>

                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button type="submit" className="w-full bg-black border-2 border-black hover:bg-transparent hover:text-black text-white px-4 py-3 rounded-lg">
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
            <button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Convert</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
