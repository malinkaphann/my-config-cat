import { useEffect, useState } from 'react';
import './App.css';
import * as configcat from "configcat-js";

const KEY = process.env.REACT_APP_CONFIG_CAT_SDK_KEY;

const MY_FLAG = "amicambodian";

const App = () => {

  const [amICambodian, setAmICambodian] = useState(true);

  useEffect(() => {

    const configCatClient = configcat.createClient(KEY, 
      {
        pollIntervalSeconds: 4,
        configChanged: function () {
            updateLocalFlag();
        }
    });

    const updateLocalFlag = async () => {
      const data = await configCatClient.getValueAsync(MY_FLAG, true);
      setAmICambodian(data);
    }

    updateLocalFlag()

  },[]);


  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px"}}>
    <div>
      I am Cambodian. {amICambodian ? '===> yes of course' : '===> no you\'re not'}
    </div>
    </div>
  );
}

export default App;
