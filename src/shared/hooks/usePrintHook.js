import { Button } from "@components/Button";

const usePrintHook = (refElement, iframref) => {
  function printPartOfPage(refPrint, iframref) {
    const content = refPrint?.current;

    let pri;
    if (document.getElementById(iframref)) {
      pri = document.getElementById(iframref).contentWindow;
    } else {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("title", iframref);
      iframe.setAttribute("id", iframref);
      iframe.setAttribute("style", "height: 0px; width: 0px; position: absolute;");
      document.body.appendChild(iframe);
      pri = iframe.contentWindow;
    }
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  }

  const handleExportPrint = () => {
    printPartOfPage(refElement, iframref);
  };
  const ButtonPrint = () => {
    return (
      <Button onClick={handleExportPrint} width="w-10" type="button">
        <i className="fi fi-rr-print" />
      </Button>
    );
  };
  return [ButtonPrint];
};

export default usePrintHook;
