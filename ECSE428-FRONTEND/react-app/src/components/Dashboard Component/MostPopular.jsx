import React from 'react';
import '../../styles/Dashboard Component/MostPopular.scss';
import { PieChart } from 'react-minimal-pie-chart';
import DonutChart from 'react-donut-chart';
function MostPopular() {
    return (
        <div className="popular-container">
        <div className="header"> <b> Most Popular Classes in my network</b> </div>
            <div className="body">
                <DonutChart
                data={[
                { label: 'ECSE428', value: 7, color: '#C1C8E4' },
                { label: 'ECSE316', value: 5, color: '#8860D0' },
                { label: 'COMP250', value: 30, color: '#5680E9' },
                { label: 'COMP251', value: 30, color: '#84CEEB' },
                { label: 'ECSE222', value: 14, color: '#5AB9EA' },
                { label: 'ECSE202', value: 14, color: '#66A103' },    
                ]}
            />
        </div>

     
    </div>
    )
}

export default MostPopular
