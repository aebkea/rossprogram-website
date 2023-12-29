import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useWindowSize } from './ImageCarousel';
import Image from 'next/image';

export default function ImageModal({ open, setOpen, image, unoptimized, width, height, placeholder }) {
  const [containerWidth, setContainerWidth] = useState(null);
  const [needsScaling, setNeedsScaling] = useState(false)

  const windowSize = useWindowSize()

  useEffect(() => {
    const updateHeight = () => {
      if (image) {
        const maxWidth = 672
        const actualWidth = Math.min(maxWidth, windowSize.width)
        const imageHeight = image?.height ?? height
        const imageWidth = image?.width ?? width
        const defaultHeight = actualWidth * imageHeight / imageWidth
        if (defaultHeight >= 0.8 * windowSize.height) {
          const scalingFactor = (0.8 * windowSize.height) / defaultHeight
          const newWidth = actualWidth * scalingFactor
          setContainerWidth(`${newWidth}px`)
          setNeedsScaling(true)
        } else {
          setNeedsScaling(false)
          setContainerWidth(null)
        }
      }
    };

    if (open) {
      window.addEventListener('resize', updateHeight);
      updateHeight();
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [open, image, windowSize]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-500 dark:bg-slate-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 dark:bg-slate-900" style={ needsScaling ? { width: containerWidth } : {} }>
                <Image id="imageModal" src={image} alt="" placeholder={placeholder} width={width} height={height} unoptimized={unoptimized} className="rounded-sm max-h-[calc(80vh-6rem)] object-contain" />
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-violet-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 dark:bg-violet-900 dark:hover:bg-violet-950"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
