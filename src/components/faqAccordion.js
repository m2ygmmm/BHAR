import { Accordion } from "flowbite-react";

function faqAccordion() {
  return (
    <Accordion>
      <Accordion.Panel>
        <Accordion.Title>What areas do you cover?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
          We currently only operate within the following areas: Brighton, Hove, Portslade, Southwick, Ovingdean, Rottingdean, Saltdean and Woodingdean as well as Major airports including London Gatwick, Heathrow, Stansted and Luton. Pick-ups in areas beyond will incur an additional charge. In some cases we may have to cancel your booking if it exceedes our operating area, depending on driver avaliablity.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Are your prices fully inclusive?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
          Yes! Our prices include all relevant charges including ULEZ, Congestion charges, Toll roads and airport drop-off fees. If for any reason your quoted price changes, we will notfiy you beforehand.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>What payment methods are accepted?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
          We accept cash, all major credit and debit cards, as well as Apple Pay and Google Pay.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}

export default faqAccordion;