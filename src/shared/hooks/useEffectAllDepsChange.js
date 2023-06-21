import { useEffect, useRef } from "react";

export default function useEffectAllDepsChange(fn, deps) {
  const prevDeps = usePrevious(deps);
  const changeTarget = useRef();

  useEffect(() => {
    // nothing to compare to yet
    if (changeTarget.current === undefined) {
      changeTarget.current = prevDeps;
    }

    // we're mounting, so call the callback
    if (changeTarget.current === undefined) {
      return fn();
    }

    // make sure every dependency has changed
    if (changeTarget.current.every((dep, i) => dep !== deps[i])) {
      changeTarget.current = deps;

      return fn();
    }
  }, [fn, prevDeps, deps]);
}
