import * as uuid from 'uuid';

import { ActiveProcess } from './interfaces/ActiveProcess';
import { AsyncProcessManagerAction } from './enums/AsyncProcessManagerAction';
import { RequestTools } from '../request';
import { useMemo } from 'react';

export interface IAsyncProcessManager {
  onFirstActiveStart?: (process: ActiveProcess) => void;
  onAllFinished?: () => void;
  onError?: (
    e: any,
    code: number | null,
    message: string,
    process: ActiveProcess
  ) => void;
  onChange?: (
    activeProcesses: ActiveProcess[],
    action: AsyncProcessManagerAction
  ) => void;
}

export class AsyncProcessManager {
  public isBusy: boolean = false;

  private onFirstActiveStartHandler?: (process: ActiveProcess) => void;
  private onAllFinishedHandler?: () => void;
  private onErrorHandler?: (
    e: any,
    code: number | null,
    message: string,
    process: ActiveProcess
  ) => void;
  private onChangeHandler?: (
    activeProcesses: ActiveProcess[],
    action: AsyncProcessManagerAction
  ) => void;

  private active: ActiveProcess[] = [];

  static forEachAsync(items: any, fn: any) {
    return items.reduce(function (promise: any, item: any) {
      return promise.then(function () {
        return fn(item);
      });
    }, Promise.resolve());
  }

  public constructor(props: IAsyncProcessManager) {
    this.onFirstActiveStartHandler = props.onFirstActiveStart;
    this.onAllFinishedHandler = props.onAllFinished;
    this.onErrorHandler = props.onError;
    this.onChangeHandler = props.onChange;

    if (this.onChangeHandler)
      this.onChangeHandler(this.active, AsyncProcessManagerAction.Initialized);
  }

  public async doProcess(props: {
    name: string;
    description?: string;
    disableStartHandler?: boolean;
    action: CallableFunction;
    onError?: (
      e: any,
      code: number | null,
      message: string,
      process: ActiveProcess
    ) => boolean | void;
  }): Promise<void> {
    let process = {
      id: uuid.v4().toString(),
      name: props.name,
      description: props.description,
      startedAt: new Date(),
    };

    this.active.push(process);

    if (this.onChangeHandler)
      this.onChangeHandler(
        this.active,
        AsyncProcessManagerAction.ProcessStarted
      );

    if (
      this.active.length === 1 &&
      this.onFirstActiveStartHandler &&
      !props.disableStartHandler
    ) {
      this.isBusy = true;
      this.onFirstActiveStartHandler(process);
    }

    try {
      await props.action();
    } catch (e) {
      let code = RequestTools.getApiErrorCode(e);
      let message = RequestTools.getApiErrorMessage(e);

      if (
        (props.onError !== undefined &&
          props.onError(e, code, message, process) !== false &&
          this.onErrorHandler) ||
        (props.onError === undefined && this.onErrorHandler)
      ) {
        this.onErrorHandler(e, code, message, process);
      }
    }

    this.active = this.active.filter((activeProcess) => {
      return activeProcess.id !== process.id;
    });

    if (this.onChangeHandler)
      this.onChangeHandler(
        this.active,
        AsyncProcessManagerAction.ProcessFinished
      );

    if (this.active.length === 0 && this.onAllFinishedHandler) {
      this.isBusy = false;
      this.onAllFinishedHandler();
    }
  }

  public getAll(): ActiveProcess[] {
    return this.active;
  }

  public getById(id: string): ActiveProcess | null {
    return this.active.find((process) => process.id === id) ?? null;
  }
}

export const useAsyncProcessManager = (props: IAsyncProcessManager) =>
  useMemo(() => new AsyncProcessManager(props), []);
