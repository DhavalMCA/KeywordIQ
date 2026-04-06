from fastapi import HTTPException, status


class KeywordIQException(Exception):
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class ExternalAPIError(KeywordIQException):
    def __init__(self, service: str, message: str):
        super().__init__(f"{service} error: {message}", status_code=502)


class ValidationError(KeywordIQException):
    def __init__(self, message: str):
        super().__init__(message, status_code=400)


class CacheError(KeywordIQException):
    def __init__(self, message: str):
        super().__init__(message, status_code=500)


def http_exception(message: str, status_code: int = 500) -> HTTPException:
    return HTTPException(status_code=status_code, detail=message)
