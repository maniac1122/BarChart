function App() {

const [countryData, setCountryData] = React.useState([]);
React.useEffect() => {
  async function fetchData(){
    const response = fetch("https://disease.sh/v3/covid-19/countries")
    const data = await reponse.json();
    console.log(data);
    setCountryData(data);
  }
  fetchData();
}, [])
return (
    <div>
    <h1>Hello World</h1>
    <BarChart data={countryData} height={500} widthOfBar={5} width={countryData.length * 5} data={"casesPerOneMillion"}/>
    </div>
);
}

function BarChart({data, height, width, widthOfBar, dataType}){
    React.useEffect(()=>{
        createBarChart();
      }, [data]);


      const createBarChart = () => {
          const countryData = data.map(country=> country["casesPerOneMillion"])
          console.log("countryData", countryData);
          const countries = data.map(country => country.country);

          const dataMax = d3.max(countryData);
          const yScale = d3.scaleLinear().domain([0, dataMax]).range([0, height])
          d3.select("svg").selectAll("rect").data(countryData).enter().append("rect");
          d3.select("svg").selectAll("rect").data(countryData).style"fill", (d, i) => (i % 2 == 0 ? "#9595f" : "#44ff44"))
          .attr("x", (d,i) => i * widthOfBar)
          .attr("y", (d) => height - yScale(d+dataMax * 0.1))
          .attr("height", (d,i) => yScale(d + dataMax * 0.1))
          .attr("width", widthOfBar);
      };
      return (
        <>
        <svg width={width} height={height}></svg>
        </>
      );
    }

}

ReactDOM.render(<App/>, document.getElementByID('root'));
