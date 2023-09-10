import { component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import Layout from "./layout";
import { Center, Flex } from "~/styled-system/jsx";
import { css } from "~/styled-system/css";

export default component$(() => {
  return (
    <div style="width: 1600px; height: 65px; background: white; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
      <div style="align-self: stretch; flex: 1 1 0; padding-left: 20px; padding-right: 20px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); justify-content: flex-start; align-items: center; display: inline-flex">
        <div style="flex: 1 1 0; align-self: stretch; justify-content: flex-start; align-items: center; gap: 32px; display: flex">
          <div style="width: 35px; height: 33.06px; position: relative">
            <div style="width: 13.23px; height: 18.58px; left: 0px; top: 7.24px; position: absolute">
              <div style="width: 13.23px; height: 18.58px; left: 0px; top: 0px; position: absolute; background: #1F2937"></div>
              <div style="width: 9.73px; height: 17.77px; left: 3.50px; top: 0.41px; position: absolute; background: #1F2937"></div>
            </div>
            <div style="width: 28.57px; height: 33.06px; left: 6.43px; top: 0px; position: absolute">
              <div style="width: 28.36px; height: 33.06px; left: 0.21px; top: 0px; position: absolute; background: #1F2937"></div>
              <div style="width: 22.91px; height: 27.62px; left: 0px; top: 2.71px; position: absolute">
                <div style="width: 0.49px; height: 0.46px; left: 0.01px; top: 5.43px; position: absolute; background: #1F2937"></div>
                <div style="width: 0.50px; height: 0.48px; left: 0px; top: 21.73px; position: absolute; background: #1F2937"></div>
                <div style="width: 22.70px; height: 27.62px; left: 0.21px; top: 0px; position: absolute; background: #1F2937"></div>
              </div>
            </div>
          </div>
          <div style="flex: 1 1 0; height: 64px; justify-content: center; align-items: center; gap: 16px; display: flex">
            <div style="align-self: stretch; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
              <div style="text-align: center; color: #0E9F6E; font-size: 14px; font-family: Inter; font-weight: 500; line-height: 21px; word-wrap: break-word">
                Dashboard
              </div>
            </div>
            <div style="height: 64px; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
              <div style="text-align: center; color: #6B7280; font-size: 14px; font-family: Inter; font-weight: 500; line-height: 21px; word-wrap: break-word">
                Team
              </div>
            </div>
            <div style="height: 64px; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
              <div style="text-align: center; color: #6B7280; font-size: 14px; font-family: Inter; font-weight: 500; line-height: 21px; word-wrap: break-word">
                Projects
              </div>
            </div>
            <div style="height: 64px; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
              <div style="text-align: center; color: #6B7280; font-size: 14px; font-family: Inter; font-weight: 500; line-height: 21px; word-wrap: break-word">
                Calendar
              </div>
            </div>
            <div style="flex: 1 1 0; height: 64px; flex-direction: column; justify-content: center; align-items: flex-end; display: inline-flex">
              <div style="flex: 1 1 0; padding-top: 4px; padding-left: 4px; padding-right: 4px; justify-content: flex-start; align-items: center; gap: 6px; display: inline-flex">
                <div style="width: 24px; height: 24px; position: relative">
                  <div style="width: 24px; height: 24px; left: 0px; top: 0px; position: absolute">
                    <div style="width: 18px; height: 16px; left: 3px; top: 4px; position: absolute; border: 1px #111827 solid"></div>
                  </div>
                </div>
                <div style="text-align: center; color: #6B7280; font-size: 14px; font-family: Inter; font-weight: 500; line-height: 21px; word-wrap: break-word">
                  Login/Register{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="align-self: stretch; height: 1px; justify-content: flex-start; align-items: center; display: inline-flex">
        <div style="flex: 1 1 0; height: 1px; background: #E5E7EB"></div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
