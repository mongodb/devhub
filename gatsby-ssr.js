import React from 'react';

export const onRenderBody = ({ setPostBodyComponents }) => {
    setPostBodyComponents([
        <script type="text/javascript" key="add-statcounter-vars">
            var sc_project=12381202; var sc_invisible=1; var
            sc_security=`0c785d57`; var sc_https=1; var sc_remove_link=1;
        </script>,
        <script
            type="text/javascript"
            src="https://www.statcounter.com/counter/counter.js"
            async
            key="add-statcounter-js-file"
        ></script>,
        <noscript key="statcounter-noscript">
            <div className="statcounter">
                <img
                    className="statcounter"
                    src="https://c.statcounter.com/12381202/0/0c785d57/1/"
                    alt="Web Analytics Made Easy - StatCounter"
                />
            </div>
        </noscript>,
    ]);
};
