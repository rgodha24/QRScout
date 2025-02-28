import React, { useState } from 'react'
import QRCode from 'qrcode.react'
import { getQrCodeDataForTeam, useAllQrState } from './store/store'

export interface QRModalProps {
  show: boolean
  title: string
  onDismiss: () => void
}

export default function QRModal(props: QRModalProps) {
  const store = useAllQrState()
  const [selectedTeam, setSelectedTeam] = useState<number | undefined>()
  const data = selectedTeam ? getQrCodeDataForTeam(selectedTeam) : undefined
  return (
    <>
      {props.show && (
        <>
          <div
            className="fixed inset-0 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50"
            id="my-modal"
          />
          <div className="fixed top-20 rounded-md border bg-white text-black p-5 shadow-lg">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl">
                {!!selectedTeam
                  ? 'pit data for ' + selectedTeam
                  : 'Choose the team to show pit data for'}
              </h1>
              <select
                name="team"
                id="team"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(Number(e.target.value))}
              >
                {store.getTeamsInStore().map((team) => (
                  <option key={team} value={team}>
                    Team {team}
                  </option>
                ))}
              </select>
              <QRCode className="m-2 mt-4" size={256} value={data || ''} />
              <div className="mt-4 flex w-full flex-row items-center justify-between">
                <div onClick={() => navigator.clipboard.writeText(data + '\n')}>
                  <svg
                    className="mr-4 h-8 w-8 text-gray-500 hover:text-gray-800 "
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />{' '}
                    <rect x="8" y="8" width="12" height="12" rx="2" />{' '}
                    <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                  </svg>
                </div>
                <button
                  className="focus:shadow-outline rounded bg-red-rhr py-2 px-4 font-bold text-white hover:bg-red-700 focus:outline-none"
                  type="button"
                  onClick={props.onDismiss}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
